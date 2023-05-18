import jsonfile from "jsonfile";
import { Exercises } from "../models/exercises/exercises";
import { ExercisesHelper } from "../models/exercises/helpers";
import { database } from "../config/database";
import e from "express";
import { Muscles } from "../models/muscles/muscles";
import { Categories } from "../models/categories/categories";
export namespace ExercisesService {
  export const getAllExercises = (): Array<Exercises> => {
    return ExercisesHelper.getAllExercises();
  };

  export const saveExercises = (): void => {
    const data = ExercisesHelper.getAllExercises();
    jsonfile.writeFile("./data/exercises.json", data, (error: any) => {
      if (error) {
        console.error(error);
        return;
      }
    });
  };

  export const loadExercises = (): void => {
    const data = jsonfile.readFileSync("./data/exercises.json");
    database.prepare("DELETE FROM exercises").run();
    data.forEach((exercises: Exercises) => {
      const muscles: Array<Muscles> = [];
      exercises.category = database
        .prepare("SELECT * FROM categories WHERE id = ?")
        .get(exercises.category) as Categories;
      exercises.muscles.forEach((muscle) => {
        muscles.push(
          database
            .prepare("SELECT * FROM muscles WHERE id = ?")
            .get(muscle) as Muscles
        );
      });
      exercises.muscles = muscles;
      ExercisesHelper.createExercises(
        exercises.name,
        exercises.category,
        exercises.description,
        exercises.image,
        exercises.machine,
        exercises.muscles,
        exercises.instructions,
        exercises.tips
      );
    });
  };

  export const createExercises = (
    name: string,
    category: Categories,
    description: string,
    image: string,
    machine: number,
    muscles: Array<Muscles>,
    instructions: string,
    tips: string
  ): void => {
    ExercisesHelper.createExercises(
      name,
      category,
      description,
      image,
      machine,
      muscles,
      instructions,
      tips
    );
  };

  export const getExercisesById = (id: string): Exercises => {
    return ExercisesHelper.getExercisesById(id);
  };

  export const deleteExercisesById = (id: string): void => {
    ExercisesHelper.deleteExercisesById(id);
  };
}

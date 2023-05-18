import { Exercises } from "./exercises";
import { database } from "../../config/database";
import { Muscles } from "../muscles/muscles";
import { Categories } from "../categories/categories";
export namespace ExercisesHelper {
  export const getMusclesByExercisesId = (id: number): Array<Muscles> => {
    const data = database
      .prepare("SELECT muscle FROM exercises_muscles WHERE exercise = ?")
      .all(id) as Array<any>;
    const muscles: Array<Muscles> = [];
    data.forEach((muscle) => {
      muscles.push(
        database
          .prepare("SELECT * FROM muscles WHERE id = ?")
          .get(muscle.muscle) as Muscles
      );
    });
    return muscles;
  };

  export const getCategoriesByExercisesId = (id: number): Categories => {
    const data = database
      .prepare("SELECT category FROM exercises_categories WHERE exercise = ?")
      .get(id) as any;
    return database
      .prepare("SELECT * FROM categories WHERE id = ?")
      .get(data.category) as Categories;
  };

  export const getAllExercises = (): Array<Exercises> => {
    const data = database
      .prepare("SELECT * FROM exercises")
      .all() as Array<Exercises>;

    data.forEach((exercise) => {
      exercise.muscles = getMusclesByExercisesId(exercise.id);
      exercise.category = getCategoriesByExercisesId(exercise.id);
    });
    return data;
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
    const result = database
      .prepare(
        "INSERT INTO exercises (name, description, image, machine, instructions, tips) VALUES ( ?, ?, ?, ?, ? ,?)"
      )
      .run(name, description, image, machine, instructions, tips);
    database
      .prepare(
        "INSERT INTO exercises_categories (exercise, category) VALUES (?, ?)"
      )
      .run(result.lastInsertRowid, category.id);
    muscles.forEach((muscle) => {
      database
        .prepare(
          "INSERT INTO exercises_muscles (exercise, muscle) VALUES (?, ?)"
        )
        .run(result.lastInsertRowid, muscle.id);
    });
  };

  export const getExercisesById = (id: string): Exercises => {
    const data = database
      .prepare("SELECT * FROM exercises WHERE id = ?")
      .get(id) as Exercises;
    data.muscles = getMusclesByExercisesId(data.id);
    data.category = getCategoriesByExercisesId(data.id);
    return data;
  };

  export const deleteExercisesById = (id: string): void => {
    database.prepare("DELETE FROM exercises WHERE id = ?").run(id);
  };
}

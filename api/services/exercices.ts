import jsonfile from "jsonfile";
import { Exercices } from "../models/exercices/exercices";
import { ExercicesHelper } from "../models/exercices/helpers";
import { database } from "../config/database";
export namespace ExercicesService {
  export const getAllExercices = (): Array<Exercices> => {
    return ExercicesHelper.getAllExercices();
  };

  export const saveExercices = (): void => {
    const data = ExercicesHelper.getAllExercices();
    jsonfile.writeFile("./data/exercices.json", data, (error: any) => {
      if (error) {
        console.error(error);
        return;
      }
    });
  };

  export const loadExercices = (): void => {
    const data = jsonfile.readFileSync("./data/exercices.json");
    database.prepare("DELETE FROM exercices").run();
    data.forEach((exercices: Exercices) => {
      ExercicesHelper.createExercices(
        exercices.name,
        exercices.category,
        exercices.description,
        exercices.image,
        exercices.machine
      );
    });
  };
  export const createExercices = (
    name: string,
    category: number,
    description: string,
    image: string,
    machine: number
  ): void => {
    ExercicesHelper.createExercices(
      name,
      category,
      description,
      image,
      machine
    );
  };

  export const getExercicesById = (id: string): Exercices => {
    return ExercicesHelper.getExercicesById(id);
  };

  export const deleteExercicesById = (id: string): void => {
    ExercicesHelper.deleteExercicesById(id);
  };
}

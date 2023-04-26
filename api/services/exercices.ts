import { Exercices } from "../models/exercices/exercices";
import { ExercicesHelper } from "../models/exercices/helpers";
export namespace ExercicesService {
  export const getAllExercices = (): Array<Exercices> => {
    return ExercicesHelper.getAllExercices();
  };
  export const createExercices = (
    name: string,
    description: string,
    image: string
  ): void => {
    ExercicesHelper.createExercices(name, description, image);
  };

  export const getExercicesById = (id: string): Exercices => {
    return ExercicesHelper.getExercicesById(id);
  };

  export const deleteExercicesById = (id: string): void => {
    ExercicesHelper.deleteExercicesById(id);
  };
}

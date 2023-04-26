import { Exercices } from "./exercices";
import { database } from "../../config/database";
export namespace ExercicesHelper {
  export const getAllExercices = (): Array<Exercices> => {
    return database
      .prepare("SELECT * FROM exercices")
      .all() as Array<Exercices>;
  };

  export const createExercices = (
    name: string,
    description: string,
    image: string
  ): void => {
    database
      .prepare(
        "INSERT INTO exercices (name, description, image) VALUES (?, ?, ?)"
      )
      .run(name, description, image);
  };

  export const getExercicesById = (id: string): Exercices => {
    return database
      .prepare("SELECT * FROM exercices WHERE id = ?")
      .get(id) as Exercices;
  };

  export const deleteExercicesById = (id: string): void => {
    database.prepare("DELETE FROM exercices WHERE id = ?").run(id);
  };
}

import { Muscles } from "./muscles";
import { database } from "../../config/database";
import { Exercises } from "../exercises/exercises";
export namespace MusclesHelper {
  export const getAllMuscles = (): Array<Muscles> => {
    return database.prepare("SELECT * FROM muscles").all() as Array<Muscles>;
  };

  export const createMuscles = (name: string): void => {
    database.prepare("INSERT INTO muscles (name) VALUES (?)").run(name);
  };

  export const getMusclesById = (id: string): Muscles => {
    return database
      .prepare("SELECT * FROM muscles WHERE id = ?")
      .get(id) as Muscles;
  };

  export const deleteMusclesById = (id: string): void => {
    database.prepare("DELETE FROM muscles WHERE id = ?").run(id);
  };
}

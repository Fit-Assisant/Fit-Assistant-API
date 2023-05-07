import { Exercises } from "./exercises";
import { database } from "../../config/database";
import { Muscles } from "../muscles/muscles";
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

  export const getAllExercises = (): Array<Exercises> => {
    const data = database
      .prepare("SELECT * FROM exercises")
      .all() as Array<Exercises>;
    data.forEach((exercise) => {
      exercise.muscles = getMusclesByExercisesId(exercise.id);
    });
    return data;
  };

  export const createExercises = (
    name: string,
    category: number,
    description: string,
    image: string,
    machine: number,
    muscles: Array<Muscles>,
    instructions: string,
    tips: string
  ): void => {
    const result = database
      .prepare(
        "INSERT INTO exercises (name, category,description, image, machine, instructions, tips) VALUES (?, ?, ?, ?, ?, ? ,?)"
      )
      .run(name, category, description, image, machine, instructions, tips);
    console.log(result.lastInsertRowid);
    console.log(muscles);
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
    return data;
  };

  export const deleteExercisesById = (id: string): void => {
    database.prepare("DELETE FROM exercises WHERE id = ?").run(id);
  };
}

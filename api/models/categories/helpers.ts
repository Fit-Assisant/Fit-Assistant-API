import { Categories } from "./categories";
import { database } from "../../config/database";
import { Exercises } from "../exercises/exercises";
import { Muscles } from "../muscles/muscles";
export namespace CategoriesHelper {
  export const getDetailedCategoryById = (id: number): Array<Exercises> => {
    const data = database
      .prepare("SELECT * FROM exercises WHERE category = ?")
      .all(id) as Array<Exercises>;
    data.forEach((exercise) => {
      exercise.muscles = getMusclesByExercisesId(exercise.id);
    });
    return data;
  };

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

  export const getAllCategories = (): Array<Categories> => {
    return database
      .prepare("SELECT * FROM categories")
      .all() as Array<Categories>;
  };

  export const createCategories = (name: string): void => {
    database.prepare("INSERT INTO categories (name) VALUES (?)").run(name);
  };

  export const getCategoriesById = (id: string): Categories => {
    const data = database
      .prepare("SELECT * FROM categories WHERE id = ?")
      .get(id) as Categories;
    data.exercises = getDetailedCategoryById(data.id);
    return data;
  };

  export const deleteCategoriesById = (id: string): void => {
    database.prepare("DELETE FROM categories WHERE id = ?").run(id);
  };
}

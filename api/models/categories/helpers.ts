import { Categories } from "./categories";
import { database } from "../../config/database";
export namespace CategoriesHelper {
  export const getAllCategories = (): Array<Categories> => {
    return database
      .prepare("SELECT * FROM categories")
      .all() as Array<Categories>;
  };

  export const createCategories = (name: string): void => {
    database.prepare("INSERT INTO categories (name) VALUES (?)").run(name);
  };

  export const getCategoriesById = (id: string): Categories => {
    return database
      .prepare("SELECT * FROM categories WHERE id = ?")
      .get(id) as Categories;
  };

  export const deleteCategoriesById = (id: string): void => {
    database.prepare("DELETE FROM categories WHERE id = ?").run(id);
  };
}

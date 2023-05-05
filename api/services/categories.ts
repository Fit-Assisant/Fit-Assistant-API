import jsonfile from "jsonfile";
import { Categories } from "../models/categories/categories";
import { CategoriesHelper } from "../models/categories/helpers";
import { database } from "../config/database";
export namespace CategoriesService {
  export const getAllCategories = (): Array<Categories> => {
    return CategoriesHelper.getAllCategories();
  };

  export const saveCategories = (): void => {
    const data = CategoriesHelper.getAllCategories();
    jsonfile.writeFile("./data/categories.json", data, (error: any) => {
      if (error) {
        console.error(error);
        return;
      }
    });
  };

  export const loadCategories = (): void => {
    const data = jsonfile.readFileSync("./data/categories.json");
    database.prepare("DELETE FROM categories").run();
    data.forEach((categories: Categories) => {
      CategoriesHelper.createCategories(categories.name);
    });
  };
  export const createCategories = (name: string): void => {
    CategoriesHelper.createCategories(name);
  };

  export const getCategoriesById = (id: string): Categories => {
    return CategoriesHelper.getCategoriesById(id);
  };

  export const deleteCategoriesById = (id: string): void => {
    CategoriesHelper.deleteCategoriesById(id);
  };
}

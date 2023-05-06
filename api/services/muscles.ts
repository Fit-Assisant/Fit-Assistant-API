import jsonfile from "jsonfile";
import { Muscles } from "../models/muscles/muscles";
import { MusclesHelper } from "../models/muscles/helpers";
import { database } from "../config/database";
export namespace MusclesService {
  export const getAllMuscles = (): Array<Muscles> => {
    return MusclesHelper.getAllMuscles();
  };

  export const saveMuscles = (): void => {
    const data = MusclesHelper.getAllMuscles();
    jsonfile.writeFile("./data/muscles.json", data, (error: any) => {
      if (error) {
        console.error(error);
        return;
      }
    });
  };

  export const loadMuscles = (): void => {
    const data = jsonfile.readFileSync("./data/muscles.json");
    database.prepare("DELETE FROM muscles").run();
    data.forEach((muscles: Muscles) => {
      MusclesHelper.createMuscles(muscles.name);
    });
  };
  export const createMuscles = (name: string): void => {
    MusclesHelper.createMuscles(name);
  };

  export const getMusclesById = (id: string): Muscles => {
    return MusclesHelper.getMusclesById(id);
  };

  export const deleteMusclesById = (id: string): void => {
    MusclesHelper.deleteMusclesById(id);
  };
}

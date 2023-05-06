import jsonfile from "jsonfile";
import { Programs } from "../models/programs/programs";
import { ProgramsHelper } from "../models/programs/helpers";
import { database } from "../config/database";
export namespace ProgramsService {
  export const getAllPrograms = (): Array<Programs> => {
    return ProgramsHelper.getAllPrograms();
  };

  export const savePrograms = (): void => {
    const data = ProgramsHelper.getAllPrograms();
    jsonfile.writeFile("./data/programs.json", data, (error: any) => {
      if (error) {
        console.error(error);
        return;
      }
    });
  };

  export const loadPrograms = (): void => {
    const data = jsonfile.readFileSync("./data/programs.json");
    database.prepare("DELETE FROM programs").run();
    data.forEach((programs: Programs) => {
      ProgramsHelper.createPrograms(
        programs.user,
        programs.name,
        programs.description,
        programs.visible,
        programs.published
      );
    });
  };
  export const createPrograms = (
    user: number,
    name: string,
    description: string,
    visible: number,
    published: number
  ): void => {
    ProgramsHelper.createPrograms(user, name, description, visible, published);
  };

  export const getProgramsById = (id: string): Programs => {
    return ProgramsHelper.getProgramsById(id);
  };

  export const deleteProgramsById = (id: string): void => {
    ProgramsHelper.deleteProgramsById(id);
  };

  export const addingExercisesToPrograms = (
    program_id: number,
    exercises_id: number,
    duration: number,
    repetitions: number,
    series: number,
    intensity: number
  ): void => {
    ProgramsHelper.addingExercisesToPrograms(
      program_id,
      exercises_id,
      duration,
      repetitions,
      series,
      intensity
    );
  };
}

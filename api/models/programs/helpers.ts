import { Programs } from "./programs";
import { Series } from "./series";
import { database } from "../../config/database";
import { Exercises } from "../exercises/exercises";
export namespace ProgramsHelper {
  export const getAllPrograms = (): Array<Programs> => {
    const programs = database
      .prepare("SELECT * FROM programs")
      .all() as Array<Programs>;
    programs.forEach((program: Programs) => {
      program.exercises = getDetailedProgramsById(program.id.toString());
    });
    return programs;
  };

  export const createPrograms = (
    user: number,
    name: string,
    description: string,
    visible: number,
    published: number
  ): void => {
    database
      .prepare(
        "INSERT INTO programs (user, name, description, visible, published) VALUES (?, ?, ?, ?, ?)"
      )
      .run(user, name, description, visible, published);
  };

  export const getDetailedProgramsById = (id: string): Array<Series> => {
    const series = database
      .prepare("SELECT * FROM programs_exercises WHERE program = ?")
      .all(id) as Array<Series>;
    series.forEach((serie: Series) => {
      serie.details = database
        .prepare("SELECT * FROM exercises WHERE id = ?")
        .get(serie.exercise) as Exercises;
    });
    return series;
  };

  export const getProgramsById = (id: string): Programs => {
    const program = database
      .prepare("SELECT * FROM programs WHERE id = ?")
      .get(id) as Programs;
    program.exercises = getDetailedProgramsById(id);
    return program;
  };

  export const deleteProgramsById = (id: string): void => {
    database.prepare("DELETE FROM programs WHERE id = ?").run(id);
  };

  export const addingExercisesToPrograms = (
    program_id: number,
    exercises_id: number,
    duration: number,
    repetitions: number,
    series: number,
    intensity: number
  ): void => {
    const sorting = (
      database
        .prepare(
          "SELECT MAX(sorting) as maxSorting FROM programs_exercises WHERE program = ?"
        )
        .get(program_id) as any
    ).maxSorting;
    if (duration == 0) duration = null as any;
    if (repetitions == 0) repetitions = null as any;
    if (series == 0) series = null as any;
    if (intensity == 0) intensity = null as any;

    database
      .prepare(
        "INSERT INTO programs_exercises (program, exercise, sorting, duration, repetitions, series, intensity) VALUES (?, ?, ?, ?, ?, ?, ?)"
      )
      .run(
        program_id,
        exercises_id,
        sorting + 1,
        duration,
        repetitions,
        series,
        intensity
      );
  };
}

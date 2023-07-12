import { Programs } from "./programs";
import { Series } from "./series";
import { database } from "../../config/database";
import { Exercises } from "../exercises/exercises";
import { Categories } from "../categories/categories";
import { Muscles } from "../muscles/muscles";
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

  export const createPrograms = (name: string, difficulty: string): void => {
    database
      .prepare("INSERT INTO programs (name,difficulty) VALUES (?, ?)")
      .run(name, difficulty);
  };

  export const getDetailedProgramsById = (id: string): Array<Series> => {
    const series = database
      .prepare("SELECT * FROM programs_exercises WHERE program = ?")
      .all(id) as Array<Series>;
    series.forEach((serie: Series) => {
      serie.details = database
        .prepare("SELECT * FROM exercises WHERE id = ?")
        .get(serie.exercise) as Exercises;
      serie.details.muscles = getMusclesByExercisesId(serie.exercise);
      serie.details.category = getCategoriesByExercisesId(serie.exercise);
    });

    return series;
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

  export const getCategoriesByExercisesId = (id: number): Categories => {
    const data = database
      .prepare("SELECT category FROM exercises_categories WHERE exercise = ?")
      .get(id) as any;
    return database
      .prepare("SELECT * FROM categories WHERE id = ?")
      .get(data.category) as Categories;
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

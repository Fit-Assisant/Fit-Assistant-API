import { Exercises } from "../exercises/exercises";

export interface Categories {
  id: number;
  name: string;
  exercises: Array<Exercises>;
}

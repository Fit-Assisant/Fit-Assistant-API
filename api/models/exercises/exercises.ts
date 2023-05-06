import { Muscles } from "../muscles/muscles";

export interface Exercises {
  id: number;
  name: string;
  category: number;
  description: string;
  image: string;
  machine: number;
  muscles: Array<Muscles>;
}

import { Categories } from "../categories/categories";
import { Muscles } from "../muscles/muscles";

export interface Exercises {
  id: number;
  name: string;
  category: Categories;
  description: string;
  image: string;
  machine: number;
  muscles: Array<Muscles>;
  instructions: string;
  tips: string;
}

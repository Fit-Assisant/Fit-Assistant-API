import { Series } from "./series";

export interface Programs {
  id: number;
  user: number;
  name: string;
  description: string;
  visible: number;
  published: number;
  exercices: Array<Series>;
}

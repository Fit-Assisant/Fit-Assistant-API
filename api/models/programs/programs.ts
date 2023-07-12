import { Series } from "./series";

export interface Programs {
  id: number;
  name: string;
  difficulty: string;
  exercises: Array<Series>;
}

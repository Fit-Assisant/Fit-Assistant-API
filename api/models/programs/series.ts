import { Exercices } from "../exercices/exercices";

export interface Series {
  exercice: number;
  sorting: number;
  duration: number;
  repetitions: number;
  series: number;
  intensity: number;
  details: Exercices;
}

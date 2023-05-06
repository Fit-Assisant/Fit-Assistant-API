import { Request, Response } from "express";
import { ExercisesService } from "../services/exercises";
const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
  const exercises = ExercisesService.getAllExercises();
  res.send(exercises);
});

route.get("/save", (req: Request, res: Response) => {
  ExercisesService.saveExercises();
  res.sendStatus(200);
});

route.get("/load", (req: Request, res: Response) => {
  ExercisesService.loadExercises();
  res.sendStatus(200);
});

route.post("/create", (req: Request, res: Response) => {
  const { name, category, description, image, machine, muscles } = req.body;
  ExercisesService.createExercises(
    name,
    category,
    description,
    image,
    machine,
    muscles
  );
  res.sendStatus(201);
});

route.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const exercises = ExercisesService.getExercisesById(id);
  res.send(exercises);
});

route.get("/delete/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  ExercisesService.deleteExercisesById(id);
  res.sendStatus(204);
});

export default route;

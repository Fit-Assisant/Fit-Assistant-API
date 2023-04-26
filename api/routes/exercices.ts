import { Request, Response } from "express";
import { ExercicesService } from "../services/exercices";
const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
  const exercices = ExercicesService.getAllExercices();
  res.send(exercices);
});

route.post("/create", (req: Request, res: Response) => {
  const { name, description, image } = req.body;
  ExercicesService.createExercices(name, description, image);
  res.sendStatus(201);
});

route.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const exercices = ExercicesService.getExercicesById(id);
  res.send(exercices);
});

route.get("/delete/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  ExercicesService.deleteExercicesById(id);
  res.sendStatus(204);
});

export default route;

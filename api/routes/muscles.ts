import { Request, Response } from "express";
import { MusclesService } from "../services/muscles";
const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
  const exercises = MusclesService.getAllMuscles();
  res.send(exercises);
});

route.get("/save", (req: Request, res: Response) => {
  MusclesService.saveMuscles();
  res.sendStatus(200);
});

route.get("/load", (req: Request, res: Response) => {
  MusclesService.loadMuscles();
  res.sendStatus(200);
});

route.post("/create", (req: Request, res: Response) => {
  const { name } = req.body;
  MusclesService.createMuscles(name);
  res.sendStatus(201);
});

route.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const exercises = MusclesService.getMusclesById(id);
  res.send(exercises);
});

route.get("/delete/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  MusclesService.deleteMusclesById(id);
  res.sendStatus(204);
});

export default route;

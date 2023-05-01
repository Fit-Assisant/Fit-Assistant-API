import { Request, Response } from "express";
import { ProgramsService } from "../services/programs";
const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
  const programs = ProgramsService.getAllPrograms();
  res.send(programs);
});

route.get("/save", (req: Request, res: Response) => {
  ProgramsService.savePrograms();
  res.sendStatus(200);
});

route.get("/load", (req: Request, res: Response) => {
  ProgramsService.loadPrograms();
  res.sendStatus(200);
});

route.post("/create", (req: Request, res: Response) => {
  const { user, name, description, visible, published } = req.body;
  ProgramsService.createPrograms(user, name, description, visible, published);
  res.sendStatus(201);
});

route.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const programs = ProgramsService.getProgramsById(id);
  res.send(programs);
});

route.get("/delete/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  ProgramsService.deleteProgramsById(id);
  res.sendStatus(204);
});

route.get("/edit/add", (req: Request, res: Response) => {
  const program_id = parseInt(req.query.program as string);
  const exercice_id = parseInt(req.query.exercice as string);
  const duration = parseInt(req.query.duration as string);
  const series = parseInt(req.query.series as string);
  const repetitions = parseInt(req.query.repetitions as string);
  const intensity = parseInt(req.query.intensity as string);
  ProgramsService.addingExercicesToPrograms(
    program_id,
    exercice_id,
    duration,
    series,
    repetitions,
    intensity
  );
  res.sendStatus(204);
});

export default route;

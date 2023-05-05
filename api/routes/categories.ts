import { Request, Response } from "express";
import { CategoriesService } from "../services/categories";
const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
  const exercices = CategoriesService.getAllCategories();
  res.send(exercices);
});

route.get("/save", (req: Request, res: Response) => {
  CategoriesService.saveCategories();
  res.sendStatus(200);
});

route.get("/load", (req: Request, res: Response) => {
  CategoriesService.loadCategories();
  res.sendStatus(200);
});

route.post("/create", (req: Request, res: Response) => {
  const { name } = req.body;
  CategoriesService.createCategories(name);
  res.sendStatus(201);
});

route.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const exercices = CategoriesService.getCategoriesById(id);
  res.send(exercices);
});

route.get("/delete/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  CategoriesService.deleteCategoriesById(id);
  res.sendStatus(204);
});

export default route;

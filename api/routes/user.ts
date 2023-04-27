import { Request, Response } from "express";
import { UserService } from "../services/user";
const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
  const user = UserService.getAllUser();
  res.send(user);
});

route.get("/save", (req: Request, res: Response) => {
  UserService.saveUser();
  res.sendStatus(200);
});

route.get("/load", (req: Request, res: Response) => {
  UserService.loadUser();
  res.sendStatus(200);
});

route.post("/create", (req: Request, res: Response) => {
  const { firstname, lastname, username, age, sexe, email } = req.body;
  UserService.createUser(firstname, lastname, username, age, sexe, email);
  res.sendStatus(201);
});

route.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user = UserService.getUserById(id);
  res.send(user);
});

route.get("/delete/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  UserService.deleteUserById(id);
  res.sendStatus(204);
});

export default route;

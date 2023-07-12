import { Request, Response } from "express";
import { UserService } from "../services/user";
const route = require("express").Router();

/**
 * Road declaration to return all content
 *
 * @param req - The detailed request
 * @param res  - The response detail
 *
 * @returns The list of all users
 *
 * @beta
 */
route.get("/", (req: Request, res: Response) => {
  const user = UserService.getAllUser();
  res.send(user);
});

/**
 * Road declaration to save datas
 *
 * @param req - The detailed request
 * @param res  - The response detail
 *
 * @beta
 */
route.get("/save", (req: Request, res: Response) => {
  UserService.saveUser();
  res.sendStatus(200);
});

/**
 * Road declaration to load datas
 *
 * @param req - The detailed request
 * @param res  - The response detail
 *
 * @beta
 */
route.get("/load", (req: Request, res: Response) => {
  UserService.loadUser();
  res.sendStatus(200);
});

/**
 * Road declaration to create new user
 *
 * @param req - The detailed request
 * @param res  - The response detail
 *
 * @beta
 */
route.post("/create", (req: Request, res: Response) => {
  const { firstname, lastname, username, email, password } = req.body;
  UserService.createUser(firstname, lastname, username, email, password);
  res.sendStatus(201);
});

/**
 * Road declaration to request user by id
 *
 * @param req - The detailed request
 * @param res  - The response detail
 *
 * @returns Finded user
 *
 * @beta
 */
route.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user = UserService.getUserById(id);
  res.send(user);
});

/**
 * Road declaration to delete user by id
 *
 * @param req - The detailed request
 * @param res  - The response detail
 *
 * @beta
 */
route.get("/delete/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  UserService.deleteUserById(id);
  res.sendStatus(200);
});

/**
 * Road declaration to check if user exist by email and password
 *
 * @param req - The detailed request
 * @param res  - The response detail
 *
 * @beta
 */
route.post("/check", (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = UserService.checkUser(email, password);
  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

/**
 * Road declaration to find user by email
 *
 * @param req - The detailed request
 * @param res  - The response detail
 *
 * @returns Finded user
 *
 * @beta
 */
route.post("/find", (req: Request, res: Response) => {
  const { email } = req.body;
  return UserService.getUserByEmail(email);
});

export default route;

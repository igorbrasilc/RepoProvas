import { Request, Response } from "express";
import AppLog from "../utils/AppLog";
import { CreateUserData, CreateUserInput } from "../types/userTypes";
import * as service from "../services/userService";

export async function signUp(req: Request, res: Response) {
  const userInput: CreateUserInput = req.body;

  await service.signUp({
    email: userInput.email,
    password: userInput.password,
  });

  AppLog("Controller", "User Created");
  res.status(201).send("User created!");
}

export async function signIn(req: Request, res: Response) {
  const userInput: CreateUserData = req.body;

  const token = await service.signIn(userInput);

  AppLog("Controller", "User logged in");
  res.status(200).send({ token });
}

import { Request, Response } from "express";
import AppLog from "../utils/AppLog";
import * as service from "../services/testService";
import { TestInputData } from "../types/testTypes";

export async function postTest(req: Request, res: Response) {
  const testInput: TestInputData = req.body;

  await service.postTest(testInput);

  AppLog("Controller", "Test created");
  res.status(201).send("Test created!");
}

import { Request, Response } from "express";
import AppLog from "../utils/AppLog";
import * as service from "../services/testService";
import { GetTestQueryData, TestInputData } from "../types/testTypes";
import { User } from ".prisma/client";

export async function postTest(req: Request, res: Response) {
  const testInput: TestInputData = req.body;

  await service.postTest(testInput);

  AppLog("Controller", "Test created");
  res.status(201).send("Test created!");
}

export async function getTests(req: Request, res: Response) {
  const { groupBy } = req.query;

  const testsData = await service.getTests(groupBy as string);

  res.status(200).send({ tests: testsData });
}

export async function getCategories(req: Request, res: Response) {
  const categoriesData = await service.getCategories();
  res.status(200).send({ categories: categoriesData });
}

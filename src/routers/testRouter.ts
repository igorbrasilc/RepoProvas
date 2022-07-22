import { Router } from "express";
import authValidation from "../middlewares/authValidation";
import validateSchema from "../middlewares/validateSchema";
import * as schemas from "../schemas/testSchemas";
import * as controllers from "../controllers/testController";

const testRouter = Router();

testRouter.post(
  "/tests",
  [validateSchema(schemas.testSchema, "/tests"), authValidation("post /tests")],
  controllers.postTest
);
export default testRouter;

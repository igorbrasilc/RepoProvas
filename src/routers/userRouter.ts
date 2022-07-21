import { Router } from "express";
import * as schemas from "../schemas/userSchemas";
import * as controller from "../controllers/userController";
import validateSchema from "../middlewares/validateSchema";

const userRouter = Router();
userRouter.post(
  "/sign-up",
  validateSchema(schemas.signUp, "/sign-up"),
  controller.signUp
);
userRouter.post(
  "/sign-in",
  validateSchema(schemas.signIn, "/sign-in"),
  controller.signIn
);

export default userRouter;

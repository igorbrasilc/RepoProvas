import { CreateUserData, CreateUserInput } from "../types/userTypes";
import * as utils from "../utils/userUtils";
import * as repository from "../repositories/userRepository";
import { conflictError, notFoundError } from "../utils/errorUtils";

export async function checkIfEmailAlreadyExists(
  email: string,
  intention: "toSignUp" | "toSignIn"
) {
  const user = await repository.findByEmail(email);

  if (intention === "toSignUp") {
    if (user) {
      throw conflictError("User already exists");
    }

    return user;
  }

  if (intention === "toSignIn") {
    if (!user) {
      throw notFoundError("User not found");
    }

    return user;
  }
}

export async function signUp(userData: CreateUserData) {
  await checkIfEmailAlreadyExists(userData.email, "toSignUp");
  const hashedPassword = utils.hashPassword(userData.password);
  const objData = {
    email: userData.email,
    password: hashedPassword,
  };
  await repository.createUser(objData);
}

export async function signIn(userInput: CreateUserData) {
  const userDb = await checkIfEmailAlreadyExists(userInput.email, "toSignIn");
  await utils.unhashAndComparePasswords(userInput.password, userDb.password);
  const token = utils.generateToken(userDb);
  return token;
}

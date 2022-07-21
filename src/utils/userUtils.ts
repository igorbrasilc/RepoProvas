import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from ".prisma/client";
import AppLog from "./AppLog";
import "dotenv/config";
import { unauthorizedError } from "./errorUtils";

export function hashPassword(password: string) {
  const salt = 8;
  const hashedPassword = bcrypt.hashSync(password, salt);

  AppLog("Util", "Hashed password");
  return hashedPassword;
}

export async function unhashAndComparePasswords(
  inputPassword: string,
  dbPassword: string
) {
  const match: Boolean = await bcrypt.compare(inputPassword, dbPassword);

  if (!match) {
    throw unauthorizedError('Passwords dont match');
  }

  AppLog("Util", "Password matched");
  return match;
}

export async function generateToken(data: User) {
  const token = jwt.sign(data, process.env.JWT_TOKEN || "secret", {
    expiresIn: 60 * 60 * 24,
  });
  AppLog("Util", "Token generated");
  return token;
}

export async function decodeToken(token: string) {
  const decodedToken = jwt.decode(token);
  AppLog("Util", "Token decoded");
  return decodedToken;
}

export function validateToken(token: string) {
  const tokenVerif = jwt.verify(token, process.env.JWT_TOKEN || "secret");
  AppLog("Util", "Token verified");
  return tokenVerif;
}

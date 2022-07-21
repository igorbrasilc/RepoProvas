import prisma from "../config/database";
import { CreateUserData } from "../types/userTypes";

export async function createUser(createData: CreateUserData) {
  return prisma.user.create({ data: createData });
}

export async function findByEmail(email: string) {
  return prisma.user.findFirst({ where: { email } });
}

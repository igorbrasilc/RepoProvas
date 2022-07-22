import { Test } from ".prisma/client";
import prisma from "../config/database";
import {
  CategoryAvailable,
  DisciplinesAvailable,
} from "../types/availableTypes";

export async function getCategoryIdFromName(categoryName: CategoryAvailable) {
  return (
    await prisma.category.findFirstOrThrow({ where: { name: categoryName } })
  ).id;
}

export async function getDisciplineFromName(
  disciplineName: DisciplinesAvailable
) {
  return (
    await prisma.discipline.findFirstOrThrow({
      where: { name: disciplineName },
    })
  ).id;
}

export async function getTeacherDisciplineIdFromDisciplineId(
  disciplineId: number
) {
  return (
    await prisma.teacherDiscipline.findFirstOrThrow({ where: { disciplineId } })
  ).id;
}

export async function postTest(data: Omit<Test, "id">) {
  return prisma.test.create({ data });
}

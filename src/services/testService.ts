import * as repository from "../repositories/testRepository";
import { conflictError, notFoundError } from "../utils/errorUtils";
import { GetTestQueryData, TestInputData } from "../types/testTypes";
import AppLog from "../utils/AppLog";
import { Test } from ".prisma/client";

export async function postTest(data: TestInputData) {
  const categoryId = await repository.getCategoryIdFromName(data.category);
  AppLog("Service", "Found category id!");
  const disciplineId = await repository.getDisciplineFromName(data.discipline);
  AppLog("Service", "Found discipline id!");
  const teacherDisciplineId =
    await repository.getTeacherDisciplineIdFromDisciplineId(disciplineId);
  AppLog("Service", "Found teacher discipline id!");
  await repository.postTest({
    name: data.name,
    pdfUrl: data.pdfUrl,
    categoryId: categoryId,
    teacherDisciplineId: teacherDisciplineId,
  } as Omit<Test, "id">);
  AppLog("Service", "Posted test!");
}

export async function getTests(groupBy: string) {
  let testsData = null;

  if (groupBy == "disciplines") {
    testsData = await repository.getTestsByDisciplines();
  }
  if (groupBy === "teachers") {
    testsData = await repository.getTestsByTeachers();
  }

  if (testsData === null) {
    throw notFoundError(
      "The query string should be 'disciplines' or 'teachers"
    );
  }
  return testsData;
}

export async function getCategories() {
  const categoriesData = await repository.getCategories();
  return categoriesData;
}

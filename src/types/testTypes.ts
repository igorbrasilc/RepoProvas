import { Test } from ".prisma/client";
import {
  CategoryAvailable,
  DisciplinesAvailable,
  TeachersAvailable,
} from "./availableTypes";

export type TestInputData = Omit<
  Test,
  "id" | "categoryId" | "teacherDisciplineId"
> & {
  category: CategoryAvailable;
  discipline: DisciplinesAvailable;
};

export type GetTestQueryData = {
  groupBy: "disciplines" | "teachers";
};

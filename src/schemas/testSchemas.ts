import joi from "joi";
import { TestInputData } from "../types/testTypes";

export const testSchema = joi.object<TestInputData>({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  category: joi.string().valid("Projeto", "Prática", "Recuperação").required(),
  discipline: joi
    .string()
    .valid(
      "HTML e CSS",
      "Javascript",
      "React",
      "Humildade",
      "Planejamento",
      "Autoconfiança"
    )
    .required(),
});

import { faker } from "@faker-js/faker";
import { TestInputData } from "../../src/types/testTypes";

export function generateDataInput(random: boolean = false) {
  return random
    ? <TestInputData>{
        name: faker.random.words(2),
        category: faker.random.word(),
        pdfUrl: faker.internet.url(),
        discipline: faker.random.word(),
      }
    : <TestInputData>{
        name: faker.random.words(2),
        category: "Projeto",
        pdfUrl: faker.internet.url(),
        discipline: "Humildade",
      };
}

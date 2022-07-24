import { faker } from "@faker-js/faker";
import { CreateUserData, CreateUserInput } from "../../src/types/userTypes";

const USER_TEST = "igor@igor.net";
const PASSWORD_TEST = "0800";

export function createUser(random: boolean = false) {
  return random
    ? <CreateUserInput>{
        email: faker.internet.email(),
        password: PASSWORD_TEST,
        passwordConfirmation: PASSWORD_TEST,
      }
    : <CreateUserInput>{
        email: USER_TEST,
        password: PASSWORD_TEST,
        passwordConfirmation: PASSWORD_TEST,
      };
}

export function loginUser(random: boolean = false) {
  return random
    ? <CreateUserData>{
        email: faker.internet.email(),
        password: PASSWORD_TEST,
      }
    : <CreateUserData>{
        email: USER_TEST,
        password: PASSWORD_TEST,
      };
}

export function wrongInputSchema() {
  return <CreateUserInput>{
    email: USER_TEST,
    password: PASSWORD_TEST,
    passwordConfirmation: "0801",
  };
}

export function wrongLoginPassword() {
  return <CreateUserData>{
    email: USER_TEST,
    password: "0801",
  };
}

export function wrongLoginSchema() {
  return <CreateUserInput>{
    email: USER_TEST,
    password: "0801",
    passwordConfirmation: "0801",
  };
}

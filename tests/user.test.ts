import supertest from "supertest";
import prisma from "../src/config/database";
import app from "../src/app";
import * as factory from "./factory/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
});

describe("user creating test suite", () => {
  it("creating a user with correct schema returns 201", async () => {
    const user = factory.createUser(true);
    const result = await supertest(app).post("/sign-up").send(user);
    expect(result.statusCode).toBe(201);
  });

  it("creating a user with incorrect schema returns 422", async () => {
    const user = factory.wrongInputSchema();
    const result = await supertest(app).post("/sign-up").send(user);
    expect(result.statusCode).toBe(422);
  });

  it("creating twice a user with same email returns 409", async () => {
    const user = factory.createUser();
    const insertionOne = await supertest(app).post("/sign-up").send(user);
    expect(insertionOne.statusCode).toBe(201);
    const insertionTwo = await supertest(app).post("/sign-up").send(user);
    expect(insertionTwo.statusCode).toBe(409);
  });
});

describe("user login test suite", () => {
  it("login a user with correct schema returns 200 and token", async () => {
    const userCreate = factory.createUser();
    const insertion = await supertest(app).post("/sign-up").send(userCreate);
    expect(insertion.statusCode).toBe(201);
    const userLogin = factory.loginUser();
    const login = await supertest(app).post("/sign-in").send(userLogin);
    expect(login.statusCode).toBe(200);
    expect(login).not.toBeNull();
  });

  it("login a user with incorrect schema returns 422", async () => {
    const user = factory.wrongLoginSchema();
    const result = await supertest(app).post("/sign-in").send(user);
    expect(result.statusCode).toBe(422);
  });

  it("login a user with incorrect password return 401", async () => {
    const userCreate = factory.createUser();
    const insertion = await supertest(app).post("/sign-up").send(userCreate);
    expect(insertion.statusCode).toBe(201);
    const userLogin = factory.wrongLoginPassword();
    const login = await supertest(app).post("/sign-in").send(userLogin);
    expect(login.statusCode).toBe(401);
  });

  it("login a user that does not exist returns 404", async () => {
    const userLogin = factory.loginUser(true);
    const login = await supertest(app).post("/sign-in").send(userLogin);
    expect(login.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

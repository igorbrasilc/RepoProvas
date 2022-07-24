import supertest from "supertest";
import prisma from "../src/config/database";
import app from "../src/app";
import * as factory from "./factory/testFactory";
import * as userFactory from "./factory/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
});

describe("Test creation test suite", () => {
  it("should create a test when correct info returning 201", async () => {
    const createUserData = userFactory.createUser();
    const userInsertion = await supertest(app)
      .post("/sign-up")
      .send(createUserData);
    expect(userInsertion.statusCode).toBe(201);
    const userLogin = userFactory.loginUser();
    const getToken = await supertest(app).post("/sign-in").send(userLogin);
    expect(getToken.body.token).not.toBeNull();
    const testInput = factory.generateDataInput();
    const createTest = await supertest(app)
      .post("/tests")
      .send(testInput)
      .set("Authorization", `Bearer ${getToken.body.token}`);
    expect(createTest.statusCode).toBe(201);
  });

  it("given incorrect input should return 422", async () => {
    const createUserData = userFactory.createUser();
    const userInsertion = await supertest(app)
      .post("/sign-up")
      .send(createUserData);
    expect(userInsertion.statusCode).toBe(201);
    const userLogin = userFactory.loginUser();
    const getToken = await supertest(app).post("/sign-in").send(userLogin);
    expect(getToken.body.token).not.toBeNull();
    const testInput = factory.generateDataInput(true);
    const createTest = await supertest(app)
      .post("/tests")
      .send(testInput)
      .set("Authorization", `Bearer ${getToken.body.token}`);
    expect(createTest.statusCode).toBe(422);
  });

  it("not sent or wrong token returns a 401 status", async () => {
    const testInput = factory.generateDataInput();
    const createTest = await supertest(app).post("/tests").send(testInput);
    expect(createTest.statusCode).toBe(401);
    const createTest2 = await supertest(app)
      .post("/tests")
      .send(testInput)
      .set("Authorization", `Bearer random`);
    expect(createTest2.statusCode).toBe(401);
  });

  it("Given the request with correct headers should return tests by discipline", async () => {
    const createUserData = userFactory.createUser();
    const userInsertion = await supertest(app)
      .post("/sign-up")
      .send(createUserData);
    expect(userInsertion.statusCode).toBe(201);
    const userLogin = userFactory.loginUser();
    const getToken = await supertest(app).post("/sign-in").send(userLogin);
    expect(getToken.body.token).not.toBeNull();
    const getTests = await supertest(app)
      .get("/tests?groupBy=disciplines")
      .set("Authorization", `Bearer ${getToken.body.token}`);
    expect(getTests.body.tests).not.toBeUndefined();
    expect(getTests.statusCode).toBe(200);
  });

  it("Given the request with correct headers should return tests by teachers", async () => {
    const createUserData = userFactory.createUser();
    const userInsertion = await supertest(app)
      .post("/sign-up")
      .send(createUserData);
    expect(userInsertion.statusCode).toBe(201);
    const userLogin = userFactory.loginUser();
    const getToken = await supertest(app).post("/sign-in").send(userLogin);
    expect(getToken.body.token).not.toBeNull();
    const getTests = await supertest(app)
      .get("/tests?groupBy=teachers")
      .set("Authorization", `Bearer ${getToken.body.token}`);
    expect(getTests.body.tests).not.toBeUndefined();
    expect(getTests.statusCode).toBe(200);
  });

  it("Given the request with incorrect query should return 404", async () => {
    const createUserData = userFactory.createUser();
    const userInsertion = await supertest(app)
      .post("/sign-up")
      .send(createUserData);
    expect(userInsertion.statusCode).toBe(201);
    const userLogin = userFactory.loginUser();
    const getToken = await supertest(app).post("/sign-in").send(userLogin);
    expect(getToken.body.token).not.toBeNull();
    const getTests = await supertest(app)
      .get("/tests?groupBy=randomText")
      .set("Authorization", `Bearer ${getToken.body.token}`);
    expect(getTests.statusCode).toBe(404);
  });

  it("Given the request with incorrect headers should return 401", async () => {
    const createUserData = userFactory.createUser();
    const userInsertion = await supertest(app)
      .post("/sign-up")
      .send(createUserData);
    expect(userInsertion.statusCode).toBe(201);
    const userLogin = userFactory.loginUser();
    const getToken = await supertest(app).post("/sign-in").send(userLogin);
    expect(getToken.body.token).not.toBeNull();
    const getTests = await supertest(app)
      .get("/tests?groupBy=randomText")
      .set("Authorization", `Bearer randomText`);
    expect(getTests.statusCode).toBe(401);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

import supertest from "supertest";
import mongoose from "mongoose";
import app from "../app.js";

const request = supertest(app);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST users", () => {
    describe("given name and password", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request.post("/api/users/login").send({
                email: "marenshiyole@gmail.com",
                password: "Marenshiyole12"
            });
            expect(response.statusCode).toBe(200);
        });
        test("should specify json in the content type header", async () => {
            const response = await request.post("/api/users/login").send({
                email: "marenshiyole@gmail.com",
                password: "Marenshiyole12"
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has id", async () => {
            const response = await request.post("/api/users/login").send({
                email: "marenshiyole@gmail.com",
                password: "Marenshiyole12"
            });
            expect(response.body._id).toBeDefined()
        })
    });

    describe("when the name and password is missing", () => {
        test("should respond with a 401 status code", async () => {
            const bodyData = [
                
                {password: "Marenshiyole142"},
                {}
            ]

            for(const body of bodyData) {
                const response = await request.post("/api/users/login").send(body);
                expect(response.statusCode).toBe(401);
            }
        });
    });
});
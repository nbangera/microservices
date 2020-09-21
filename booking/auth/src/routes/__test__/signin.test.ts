import request from "supertest";
import { app } from "../../app";

it("fails when an email does not exits", async () => {
    await request(app)
     .post("/api/users/signin")
     .send({
       email: "1test@test.com",
       password: "password",
     })
     .expect(400);
 });

 it("fails when an password does not exits", async () => {

    await request(app)
    .post("/api/users/signup")
    .send({
      email: "test123456@test1.com",
      password: "password",
    })
    .expect(201);

    await request(app)
     .post("/api/users/signin")
     .send({
       email: "test123456@test1.com",
       password: "",
     })
     .expect(400);
 });

 
 it("cookie created when logged in with correct details", async () => {

    await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

    const response = await request(app)
     .post("/api/users/signin")
     .send({
       email: "test@test.com",
       password: "password",
     })
     .expect(200);

     expect(response.get('Set-Cookie')).toBeDefined();
 });
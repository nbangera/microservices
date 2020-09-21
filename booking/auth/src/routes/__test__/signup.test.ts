import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
   await request(app)
    .post("/api/users/signup")
    .send({
      email: "abcdemail@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 with invalid email", async () => {
     await request(app)
      .post("/api/users/signup")
      .send({
        email: "abcdemail@test",
        password: "password",
      })
      .expect(400);
  });

  
it("returns a 400 with invalid password", async () => {
     await request(app)
      .post("/api/users/signup")
      .send({
        email: "abcdemail@test.com",
        password: "",
      })
      .expect(400);
  });

    
it("returns a 400 with invalid email and password", async () => {
     await request(app)
      .post("/api/users/signup")
      .send({
        email: "abcdemail.com",
        password: "",
      })
      .expect(400);
  });


  it("disallow duplicate regsitration", async () => {
    await request(app)
     .post("/api/users/signup")
     .send({
       email: "abcdemail@gmail.com",
       password: "password",
     })
     .expect(201);

     await request(app)
     .post("/api/users/signup")
     .send({
       email: "abcdemail@gmail.com",
       password: "password",
     })
     .expect(400);
 });

 it("check cookie is set after signup", async () => {
   const response =  await request(app)
     .post("/api/users/signup")
     .send({
       email: "abcdemail1@gmail.com",
       password: "password",
     })
     .expect(201);

     expect(response.get('Set-Cookie')).toBeDefined();     
 });
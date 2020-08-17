import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

app.get("/api/users/currentuser", (req, res) => {
  res.send("Hi");
});

app.post("/api/users/signin", (req, res) => {
  const body = req.body;
  res.send("user authenticated");
});

app.post("/api/users/signup", (req, res) => {
  const body = req.body;
  res.send("user created");
});

app.post("/api/users/signout", (req, res) => {
  const body = req.body;
  res.send("user  signedout");
});

app.listen(3000, () => {
  console.log("Listening on 3000 send request.");
});

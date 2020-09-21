import mongoose from "mongoose";
import {app} from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongodb-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("auth db connected.");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on 3000 send request.");
  });
};

start();

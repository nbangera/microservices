import express, { Request, Response } from "express";
const router = express.Router();
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../error/bad-request-error";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const validator = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("password").trim().notEmpty().withMessage("You must supply password"),
];

router.post(
  "/api/users/signin",
  validator,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid User not found");
    }

    const matched = Password.compare(existingUser.password, password);
    if (!matched) {
      throw new BadRequestError("Invalid User");
    }

    const userToken = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userToken,
    };

    res.status(200).send(existingUser);
  }
);
export { router as signinRouter };

import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../error/request-validation-error";
import { DatabaseValidationError } from "../error/database-connection-error";
import { User } from "../models/user";
import { BadRequestError } from "../error/bad-request-error";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

const validator = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 25 })
    .withMessage("Password must be between 4 and 25 character"),
];

router.post(
  "/api/users/signup",
  validator,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      //console.log("User already exist");
      throw new BadRequestError("Email already regsitered");
    }

    const user = User.build({ email, password });
    await user.save();
    const userToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userToken,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };

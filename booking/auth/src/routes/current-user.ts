import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { request, response } from "express";

const router = express.Router();

const validator = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 25 })
    .withMessage("Password must be between 4 and 25 character"),
];

router.get(
  "/api/users/currentuser",
  validator,
  (req: Request, res: Response) => {
    res.send("Hi");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors);
    }
  }
);
export { router as currentUserRouter };

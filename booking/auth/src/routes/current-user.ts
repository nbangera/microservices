import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { request, response } from "express";
import jwt from "jsonwebtoken";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,  
  (req: Request, res: Response) => {
    return res.send({ currentUser: req.currentUser || null });
  }
);
export { router as currentUserRouter };

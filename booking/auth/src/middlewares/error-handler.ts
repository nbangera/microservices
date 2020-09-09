import { Request, Response, NextFunction } from "express";
import { CustomError } from "../error/custom-error";


export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('from the errorHandler');

  console.log(error);
  if (error instanceof CustomError) {  
    return res.status(error.statusCode).send({ errors: error.serializeErrors() });
  }

  res.status(400).send( {errors: [{ message: "Something went wrong." }]});
};

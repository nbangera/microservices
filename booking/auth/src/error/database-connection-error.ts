import { CustomError } from "./custom-error";


export class DatabaseValidationError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database.";
  constructor() {
    super("Databse Error");
    Object.setPrototypeOf(this, DatabaseValidationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

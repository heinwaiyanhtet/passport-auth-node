import { NextFunction, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { checkUserValidation } from "../utils/validationSchemas";
import { hashPassword } from "../utils/hashPassword";
import { IEmailUser } from "../types/responses";
import { handleErrorResponse } from "../utils/responseHandler";

export function isValidUser(
  request: Request<{}, {}, IEmailUser>,
  response: Response,
  next: NextFunction
) {
  const validations = checkSchema(checkUserValidation);

  Promise.all(validations.map((validation) => validation.run(request)))
    .then(() => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return handleErrorResponse(response, { errors: errors.array() }, 400);
      }
      request.body.password = hashPassword(request.body.password);
      next()
    })
    .catch((error) => {
      console.error("Validation error:", error);
      return handleErrorResponse(response, "Internal server error", 500);
    });
}

import { Response } from "express";
interface ErrorDetail {
  msg: string;
  param?: string;
}
interface ErrorResponse {
  errors: ErrorDetail[];
}

export function handleErrorResponse(
  res: Response,
  errorMessage: string | ErrorResponse,
  statusCode: number
) {
  if (typeof errorMessage === 'string') {
    return res.status(statusCode).json({ message: errorMessage });
  } else {
    return res.status(statusCode).json({ errors: errorMessage.errors });
  }
}

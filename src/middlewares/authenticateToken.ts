import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { handleErrorResponse } from "../utils/responseHandler";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
export function authenticateToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new Error("No token provided");
    }
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    (request as CustomRequest).token = decoded;
    next();
  } catch (error) {
    return handleErrorResponse(response, "Please authenticate", 401);
  }
}

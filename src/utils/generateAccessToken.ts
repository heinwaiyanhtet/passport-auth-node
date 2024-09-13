import jwt from "jsonwebtoken";
import { UserPayload } from "../types/jwtPayload";

export function generateAccessToken(payload: UserPayload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1min",
  });
}

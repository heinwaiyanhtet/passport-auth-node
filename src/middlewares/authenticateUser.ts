import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { IEmailUser } from "../types/responses";
import { comparePassword } from "../utils/hashPassword";
import { handleErrorResponse } from "../utils/responseHandler";

export async function authenticateUser(
  req: Request<{}, {}, IEmailUser>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email }) as IEmailUser;

    if (!findUser) {
      return handleErrorResponse(res, "Invalid email or password", 400);
    }

    const isValidPassword = comparePassword(password, findUser.password);
    if (!isValidPassword) {
      return handleErrorResponse(res, "Invalid email or password", 400);
    }

    req.user = {
      _id: findUser._id,
      email: findUser.email,
      username: findUser.username,
    };

    next();
  } catch (error) {
    handleErrorResponse(res, "Authentication failed", 400);
  }
}

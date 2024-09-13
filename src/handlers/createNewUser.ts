import { Request, Response } from "express";
import { User } from "../models/user";
import { UserPayload } from "../types/jwtPayload";
import { IEmailUser } from "../types/responses";
import { handleErrorResponse } from "../utils/responseHandler";

type ResBody = { message: string; user?: UserPayload } | { message: string };

export async function createNewUser(
  request: Request<{}, {}, IEmailUser>,
  response: Response<ResBody>
) {
  const { username, email, password } = request.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      handleErrorResponse(response, "Email already exists", 400);
    }

    const newUser = (await User.create({
      username,
      email,
      password,
    })) as UserPayload;
    const userResponse = {
      _id: newUser._id,
      email: newUser.email,
      username: newUser.username,
    };

    return response.status(200).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    handleErrorResponse(
      response,
      error instanceof Error ? error.message : "An unknown error occurred",
      400
    );
  }
}

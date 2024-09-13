import { Request, Response } from "express";
import { User as UserFromDB } from "../types/responses";
import jwt from "jsonwebtoken";
import { handleErrorResponse } from "../utils/responseHandler";
import { generateAccessToken } from "../utils/generateAccessToken";
import { UserPayload } from "../types/jwtPayload";
import { RefreshToken } from "../models/refreshToken";
import mongoose from "mongoose";
import { hashPassword } from "../utils/hashPassword";

export async function generateTokens(req: Request, res: Response) {
  const currentUser = req.user as UserFromDB;

  if (!currentUser) {
    handleErrorResponse(res, "Unauthorized", 401);
  }

  const payload: UserPayload = {
    _id: currentUser._id,
    username: currentUser.username,
    email: currentUser.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

  try {
    await RefreshToken.create({
      token: hashPassword(refreshToken),
      userId: currentUser._id,
      expiryDate: expiryDate,
    });
  } catch (error) {
    return handleErrorResponse(res, "Error saving refresh token", 500);
  }

  return res.json({ accessToken: accessToken, refreshToken: refreshToken });
}

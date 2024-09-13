import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/generateAccessToken";
import { UserPayload } from "../types/jwtPayload";
import { RefreshToken } from "../models/refreshToken";
import { comparePassword } from "../utils/hashPassword";
export async function regenerateToken(request: Request, response: Response) {
    try {
        const authHeader = request.headers["authorization"];
        const refreshToken = authHeader && authHeader.split(" ")[1];
    
        if (!refreshToken) {
          console.log("Missing refresh token");
          return response.status(401).json({ message: "Refresh token missing" });
        }
    
        let decodedUser: UserPayload;
        try {
          decodedUser = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string
          ) as UserPayload;
        } catch (err) {
          console.error("JWT verification failed:", err);
          return response.status(403).json({ message: "Invalid refresh token" });
        }
    
        const storedToken = await RefreshToken.findOne({ userId: decodedUser._id });
    
        if (!storedToken) {
          return response.status(403).json({ message: "Refresh token not found" });
        }
    
        const isValidToken = comparePassword(refreshToken, storedToken.token);
        if (!isValidToken) {
          return response.status(403).json({ message: "Invalid refresh token" });
        }
        if (new Date() > storedToken.expiryDate) {
          await storedToken.deleteOne();
          return response.status(403).json({ message: "Refresh token expired" });
        }
        const payload: UserPayload = {
            _id: decodedUser._id,
            username: decodedUser.username,
            email: decodedUser.email,
          };
        const accessToken = generateAccessToken(payload);
    
        return response.json({ accessToken });
      } catch (error) {
        console.error("Internal server error:", error);
        return response.status(500).json({ message: "Internal server error" });
      }
}
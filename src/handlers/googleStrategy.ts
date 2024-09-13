import { Request } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { User } from "../models/user"; 
import { UserPayload } from "../types/jwtPayload";
import { ObjectId } from "mongoose";
import { generateJWT } from "../utils/jwtUtils"; // Import the JWT generation utility

interface GoogleProfile {
  id: string;
  displayName: string;
  emails: { value: string }[];
}

export const configureGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "http://localhost:8000/api/auth/google/callback",
        passReqToCallback: true,
      },
      async (
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: GoogleProfile,
        done: (error: any, user?: any) => void
      ) => {
        try {
          // Find the user by Google ID or create a new user
          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            user = await User.create({
              username: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              password: null, // Password not needed for Google-authenticated users
            });
          }

          // Create a user payload for the JWT
          const userPayload: UserPayload = {
            _id: user._id as ObjectId,
            email: user.email,
            username: user.username,
          };

          // Generate a JWT for the authenticated user
          const token = generateJWT(userPayload);

          req.user = userPayload; 
          req.headers['x-auth-token'] = token; 

          return done(null, { user: userPayload, token });
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
};

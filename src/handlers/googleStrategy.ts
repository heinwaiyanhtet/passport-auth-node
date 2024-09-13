import { Request } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { User } from "../models/user"; 
import { UserPayload } from "../types/jwtPayload";
import { ObjectId } from "mongoose";
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
          async (req: Request, accessToken: string, refreshToken: string, profile: GoogleProfile, done: (error: any, user?: any) => void) => {
            try {
              let user = await User.findOne({ googleId: profile.id });
              if (!user) {
                user = await User.create({
                  username: profile.displayName,
                  email: profile.emails[0].value,
                  googleId: profile.id,
                  password: null,
                });
              }
              const userPayload: UserPayload = {
                _id: user._id as ObjectId,
                email: user.email,
                username: user.username,
              };
      
              req.user = userPayload;
              return done(null, userPayload);
            } catch (error) {
              return done(error, null);
            }
          }
        )
      );
};

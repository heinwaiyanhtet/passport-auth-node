import { Schema, model } from "mongoose";
import { IEmailUser, IGoogleUser } from "../types/responses";

const UserSchema = new Schema<IEmailUser | IGoogleUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

export const User = model<IEmailUser | IGoogleUser>("Users", UserSchema);

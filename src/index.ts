import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/index";
import passport from "passport";
import { configureGoogleStrategy } from "./handlers/googleStrategy";
import session from "express-session";

dotenv.config();

const app: Application = express();

// CORS configuration
app.use(cors());

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configureGoogleStrategy();
app.use(routes);

const PORT: number = Number(process.env.PORT) || 8000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("🛢️  Connected To Database");

    app.listen(PORT, () => {
      console.log(`Server running at Port: ${PORT}`);
    });
  } catch (error) {
    console.error("⚠️ Error starting server:", error);
    process.exit(1);
  }
};

startServer();

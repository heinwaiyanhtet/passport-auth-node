import { Router } from "express";
import { generateTokens} from "../handlers/auth";
import { isValidUser } from "../middlewares/isValidUser";
import { authenticateUser } from "../middlewares/authenticateUser";
import { createNewUser } from "../handlers/createNewUser";
import passport from "passport";


const router = Router();

router.post("/register", isValidUser, createNewUser);

router.post('/login', authenticateUser, generateTokens);

router.get('/google', passport.authenticate('google',  { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), generateTokens);

export default router;

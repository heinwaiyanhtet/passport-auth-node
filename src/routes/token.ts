import { Router } from "express";
import { regenerateToken } from "../handlers/regenerateToken";

const router = Router();

router.post("/", regenerateToken)

export default router;

import express from "express";
import { loginUser, registerUser } from "../controllers/auth";
import { loginLimiter } from "../utils/loginLimiter";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginLimiter, loginUser);

export default router;

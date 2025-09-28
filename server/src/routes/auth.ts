import express from "express";
import { loginUser, registerUser } from "../controllers/auth";
import { loginLimiter } from "../middleware/loginLimiter";

const router = express.Router();

router.post("/register", registerUser);
// router.post("/login", loginLimiter, loginUser);
router.post("/login", loginUser);

export default router;

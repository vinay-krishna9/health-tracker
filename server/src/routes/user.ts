import express from "express";
import { protectedRoute } from "../middleware/auth";
import { users } from "../controllers/user";

const router = express.Router();

router.get("/users", protectedRoute, users);

export default router;

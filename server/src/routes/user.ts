import express from "express";
import { protectedRoute } from "../middleware/auth";
import { getUsers } from "../controllers/user";

const router = express.Router();

router.get("/users", protectedRoute, getUsers);

export default router;

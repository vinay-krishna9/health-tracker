import express from "express";
import { protectedRoute } from "../middleware/auth";
import {
  addHabit,
  deleteHabit,
  getHabits,
  updateHabits,
} from "../controllers/habit";

const router = express.Router();

router.post("/habits/:id", protectedRoute, addHabit);
router.get("/habits/:userId", protectedRoute, getHabits);
router.patch("/habits/:id", protectedRoute, updateHabits);
router.delete("/habits/:id", protectedRoute, deleteHabit);

export default router;

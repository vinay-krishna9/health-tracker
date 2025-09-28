import { Request, Response } from "express";
import prisma from "../database/db";

export const addHabit = async (req: Request, res: Response) => {
  try {
    console.log("🚀 Post Habit ");

    const { id } = req.params;
    const { title, description, frequency, reminderTime } = req.body;

    console.error("");

    const habit = await prisma.habit.create({
      data: {
        title,
        description,
        frequency,
        reminderTime,
        userId: Number(id),
      },
    });

    res.status(200).json(habit);
  } catch (error) {
    res.status(400).json({ message: "Failed to add habit" });
  }
};

export const getHabits = async (req: Request, res: Response) => {
  try {
    console.log("🚀 Get Habits ");

    const { userId } = req.params;

    const habits = await prisma.habit.findMany({
      where: {
        userId: Number(userId),
      },
    });

    res.status(200).json({ habits });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot get habits" });
  }
};

export const updateHabits = async (req: Request, res: Response) => {
  try {
    console.log("🚀 Update Habit ");

    const { id } = req.params;
    const { title, description, frequency, reminderTime } = req.body;

    const habit = await prisma.habit.update({
      where: {
        id: Number(id),
      },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(frequency && { frequency }),
        ...(reminderTime && { reminderTime }),
      },
    });

    res.status(200).json({ habit });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot update habit" });
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    console.log("🚀 Delete Habit ");

    const { id } = req.params;

    const habit = await prisma.habit.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ habit });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot delete habit" });
  }
};

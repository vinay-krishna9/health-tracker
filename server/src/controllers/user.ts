import { Request, Response } from "express";
import prisma from "../database/db";

export const getUsers = async (req: Request, res: Response) => {
  try {
    console.log("🚀 Get Users ");

    const users = await prisma.user.findMany();

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

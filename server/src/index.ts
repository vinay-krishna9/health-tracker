import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import habitRoute from "./routes/habit";

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/auth", authRoute);
app.use("/api", userRoute);
app.use("/api", habitRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

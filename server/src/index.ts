import dotenv from "dotenv";
dotenv.config();

import express from "express";

import authRoute from "./routes/auth";
import userRoute from "./routes/user";

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.use("/auth", authRoute);
app.use("/api", userRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

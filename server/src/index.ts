import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoute from "./routes/auth";

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

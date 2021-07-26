import "reflect-metadata";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import postRoutes from "./routes/posts";
import subRoutes from "./routes/subs";

import trim from "./middlewares/trim";
import dotenv from "dotenv";
const app = express();

dotenv.config();

app.use(express.json());
app.use(morgan("dev"));
app.use(trim);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/subs", subRoutes);

app.listen(process.env.PORT, async () => {
  console.log(`server running at port ${process.env.PORT}`);

  try {
    await createConnection();
    console.log("database connected");
  } catch (e) {
    console.error(e);
  }
});

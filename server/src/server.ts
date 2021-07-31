import "reflect-metadata";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

// routes
import authRoutes from "./routes/auth";
import postRoutes from "./routes/posts";
import subRoutes from "./routes/subs";

// trim the excess spaces in username/email
import trim from "./middlewares/trim";

const app = express();

dotenv.config();

app.use(express.json());
app.use(morgan("dev"));
app.use(trim);
app.use(cookieParser());
app.use(cors());

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

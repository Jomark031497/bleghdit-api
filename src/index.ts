import express from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import trim from "./middlewares/trimFields";
import { config as dotenv } from "dotenv";

const app = express();
dotenv();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(cors());
app.use(trim);

// endpoints
app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
  console.log(`listening to port ${PORT}`);

  try {
    await createConnection();
    console.log("connected to database");
  } catch (e) {
    console.error(e);
  }
});

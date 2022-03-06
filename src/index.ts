import "reflect-metadata";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { config as dotenv } from "dotenv";
import { createConnection } from "typeorm";
import trim from "./middlewares/trimFields";
import authenticate from "./configs/passportconfig";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/posts.routes";
import subRoutes from "./routes/subs.routes";
import voteRoutes from "./routes/vote.routes";

const app = express();
dotenv();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  session({
    secret: <string>process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
authenticate(passport);
app.use(trim);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/subs", subRoutes);
app.use("/api/vote", voteRoutes);

app.listen(PORT, async () => {
  console.log(`listening to port ${PORT}`);
  try {
    await createConnection();
  } catch (e) {
    console.error(e);
  }
});

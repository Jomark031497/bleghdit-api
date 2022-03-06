import "reflect-metadata";
import express from "express";
import cors from "cors";
import session from "express-session";
import { config as dotenv } from "dotenv";
import { createConnection } from "typeorm";
import trim from "./middlewares/trimFields";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/posts.routes";
import subRoutes from "./routes/subs.routes";
import voteRoutes from "./routes/vote.routes";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { __prod__ } from "./constants";

const main = async () => {
  await createConnection();
  const app = express();
  dotenv();
  const PORT = process.env.PORT || 8080;
  const RedisStore = connectRedis(session);
  const redis = new Redis();
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
      name: "qid",
      store: new RedisStore({ client: redis }),
      secret: <string>process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
    })
  );
  app.use(trim);

  app.use("/api/auth", authRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/subs", subRoutes);
  app.use("/api/vote", voteRoutes);

  app.listen(PORT, () => console.log(`listening to port ${PORT}`));
};

main().catch((error) => console.log(error));

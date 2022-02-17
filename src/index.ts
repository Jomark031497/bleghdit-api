import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import cookierParser from "cookie-parser";
import passport from "passport";
import { config as dotenv } from "dotenv";
import { createConnection } from "typeorm";
import trim from "./middlewares/trimFields";
import authenticate from "./configs/passportconfig";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/posts.routes";
import subRoutes from "./routes/subs.routes";
import voteRoutes from "./routes/vote.routes";

const app = express(); // initialize express app
dotenv(); // invoke dotenv config

const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json()); // recognize incoming requests as JSON Objects
app.use(express.urlencoded({ extended: false })); // recognize incoming requests as strings or arrays
// restricts allowed hosts to a single origin
app.use(
  cors({
    origin: process.env.CLIENT_URL, // client origin
    credentials: true, // allow http sessions
  })
);
app.use(
  session({
    secret: <string>process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookierParser(<string>process.env.SECRET)); // parse cookies
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // initialize session
authenticate(passport); // authenticate middleware
app.use(trim); // trim whitespaces from inputs

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/subs", subRoutes);
app.use("/api/vote", voteRoutes);
app.get("/api", (_: Request, res: Response) => {
  // test endpoint
  res.send("test endpoint: working");
});

app.listen(PORT, async () => {
  console.log(`listening to port ${PORT}`);
  try {
    if (process.env.MODE === "PRODUCTION") {
      await createConnection({
        type: "postgres",
        url: <string>process.env.DATABASE_URL,
        synchronize: true,
        logging: false,
      });

      console.log("connected to database: PRODUCTION MODE");
    } else {
      await createConnection();
      console.log("connected to database: DEVELOPMENT MODE");
    }
  } catch (e) {
    console.error(e);
  }
});

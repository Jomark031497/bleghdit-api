import express from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/posts.routes";
import subRoutes from "./routes/subs.routes";
import trim from "./middlewares/trimFields";
import { config as dotenv } from "dotenv";
import session from "express-session";
import cookierParser from "cookie-parser";
import passport from "passport";
import authenticate from "../passportconfig";

const app = express(); // initialize express app
dotenv(); // invoke dotenv config
const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json()); // recognize incoming requests as JSON Objects
app.use(express.urlencoded({ extended: false })); // recognize incoming requests as strings or arrays

// restricts allowed hosts to a single origin
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // allow http sessions
  })
);
app.use(
  session({
    secret: <string>process.env.SECRET,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(cookierParser(<string>process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
authenticate(passport);
app.use(trim);

// endpoints
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/subs", subRoutes);

app.listen(PORT, async () => {
  console.log(`listening to port ${PORT}`);

  try {
    await createConnection();
    console.log("connected to database");
  } catch (e) {
    console.error(e);
  }
});

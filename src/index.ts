import express from "express";
import { createConnection } from "typeorm";

const app = express();
const PORT = 8080;

app.listen(PORT, async () => {
  console.log(`listening to port ${PORT}`);

  try {
    await createConnection();
    console.log("connected to database");
  } catch (e) {
    console.error(e);
  }
});

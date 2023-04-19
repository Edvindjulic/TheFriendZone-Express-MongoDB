import cookieSession from "cookie-session";
import express from "express";
import { MongoClient } from "mongodb";
import userRouter from "./users/user-router";

export const app = express();

// Global Middlewares
app.use(express.json());
app.use(
  cookieSession({
    name: "login",
    secure: false,
    httpOnly: true,
    secret: "as98d7asyudbahs8d97a6digas78d866u",
    maxAge: 1000 * 3600,
  })
);

const uri =
  "mongodb+srv://superuser:DiiWV2H7irGTztEK@clusterfudge.wfhk6bq.mongodb.net/thefriendzone?retryWrites=true&w=majority";
export const client = new MongoClient(uri);
const dbName = "coolmegadatabase";
export const db = client.db(dbName);

// app.use(postRouter);
app.use(userRouter);

// const postRouter

// SKRIV DIN SERVERKOD HÄR!
// app.get("/users");

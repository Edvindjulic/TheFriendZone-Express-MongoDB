import express from "express";
import { MongoClient } from "mongodb";
import userRouter from "./users/user-router";

export const app = express();

// Global Middlewares
app.use(express.json());
// TODO: Insert cookie-stuff

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

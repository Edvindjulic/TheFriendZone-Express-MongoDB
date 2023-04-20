import cookieSession from "cookie-session";
import express from "express";
import postRouter from "./posts/post-router";
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

app.use(postRouter);
app.use(userRouter);

// SKRIV DIN SERVERKOD HÄR!
// app.get("/users");

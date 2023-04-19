import express from "express";
import mongoose from "mongoose";
import { app } from "./app";

app.use(express.json());

// HÄR SKRIVER NI KODEN FÖR ATT ANSLUTA TILL DATABASEN OCH STARTA SERVERN!
async function main() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(
    "mongodb+srv://superuser:DiiWV2H7irGTztEK@clusterfudge.wfhk6bq.mongodb.net/thefriendzone?retryWrites=true&w=majority"
  );
  console.log("Connected to database");

  app.listen(3000, () => {
    console.log("Server is running :)");
  });
}

main().catch(console.error);

import mongoose from "mongoose";
import { app, client } from "./app";

// HÄR SKRIVER NI KODEN FÖR ATT ANSLUTA TILL DATABASEN OCH STARTA SERVERN!
async function main() {
  mongoose.set("strictQuery", true);
  await client.connect();
  console.log("Connected to Atlas cluster fudge");

  app.listen(3000, () => {
    console.log("Server is running :)");
  });
}

main().catch(console.error);

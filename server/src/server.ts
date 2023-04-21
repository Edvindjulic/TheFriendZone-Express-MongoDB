import mongoose from "mongoose";
import { app } from "./app";

// HÄR SKRIVER NI KODEN FÖR ATT ANSLUTA TILL DATABASEN OCH STARTA SERVERN!
async function main() {
  await mongoose.connect(
    "mongodb+srv://superuser:DiiWV2H7irGTztEK@clusterfudge.wfhk6bq.mongodb.net/thefriendzone?retryWrites=true&w=majority"
  );
  mongoose.set("strictQuery", true);
  console.log("Connected to Atlas cluster fudge");

  app.listen(3000, () => {
    console.log("Server is running :)");
  });
}

main().catch(console.error);

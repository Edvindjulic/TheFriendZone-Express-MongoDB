import express from "express";
import { MongoClient } from "mongodb";

export const app = express();

app.use(express.json());

const uri =
  "mongodb+srv://superuser:DiiWV2H7irGTztEK@clusterfudge.wfhk6bq.mongodb.net/thefriendzone?retryWrites=true&w=majority";
export const client = new MongoClient(uri);
const dbName = "coolmegadatabase";
const db = client.db(dbName);

// async function testFunction() {
//   console.log("hejsan");
//   const userCollection = db.collection("horses");
//   userCollection.collectionName;

//   userCollection.insertOne({ name: "Simon", complexity: 1 });
// }

app.post("/horses", async (req, res) => {
  try {
    const { name, complexity } = req.body;
    const userCollection = db.collection("horses");

    const result = await userCollection.insertOne({ name, complexity });
    const insertedDocument = { _id: result.insertedId, name, complexity }; // Create the inserted document object

    res.status(201).json({ message: "Horse inserted", data: insertedDocument });
  } catch (error) {
    console.error("Error inserting horse:", error);
    res.status(500).json({
      message: "Error inserting horse",
      error: (error as any).message,
    });
  }
});

// testFunction().catch(console.error);
// SKRIV DIN SERVERKOD HÄR!
// app.get("/users");

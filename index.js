const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://fingerTech:972a04JYu8VDw61l@cluster0.clft1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("ERP");

    const dataCollection = database.collection("userCollection");

    app.post("/punchs", async (req, res) => {
      const punch = req.body
      const result = await dataCollection.insertOne(punch)
      console.log(result);
      res.json(result)

    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});

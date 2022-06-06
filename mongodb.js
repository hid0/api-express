const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb://faiz:faiz@localhost:27017/?authMechanism=DEFAULT";

(async () => {
  try {
    const client = await MongoClient.connect(connectionString, {
      useUnifiedTopology: true,
    });
    const db = client.db("latihan");

    // query to collection quotes
    const quotes = await db.collection("quotes").find().toArray();
    console.log(quotes);
  } catch (error) {
    console.log(error);
  }
})();

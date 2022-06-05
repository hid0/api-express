const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb://faiz:faiz@localhost:27017/?authMechanism=DEFAULT";

MongoClient.connect(
  connectionString,
  { useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.error(error);
    console.log("Server database connect!");
  }
);

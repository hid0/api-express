// const MongoClient = require("mongodb").MongoClient;
// const connectionString =
//   "mongodb://faiz:faiz@localhost:27017/?authMechanism=DEFAULT";

// const client = new MongoClient(connectionString, {
//   useUnifiedTopology: true,
// });

// (async () => {
//   try {
//     await client.connect();
//   } catch (error) {
//     console.log(error);
//   }
// })();

// module.exports = client;

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://faiz:faiz@localhost:27017/latihan?authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("db server connected!");
});

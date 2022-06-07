const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb://faiz:faiz@localhost:27017/?authMechanism=DEFAULT";

const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }
})();

module.exports = client;

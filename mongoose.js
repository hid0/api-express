const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://faiz:faiz@localhost:27017/latihan?authMechanism=DEFAULT",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("server db connected!");
});

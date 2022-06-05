const express = require("express");
const routers = express.Router();
const path = require("path");
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost",
};
app.use(cors(corsOptions));

routers.get("/", (req, res) => res.send("Hello World!"));

routers.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.send(`You are Logged In with username ${username} and pass ${password}`);
  // console.log(req.body.username);
});

routers.get("/preview-image", function (req, res) {
  const filename = "logo.png";
  res.sendFile(path.join(__dirname, filename), {
    headers: {
      "Content-Type": "image/png",
    },
  });
});

routers.get("/post/:id?", (req, res) => {
  if (req.params.id) res.send("artikel-" + req.params.id);
});

module.exports = routers;

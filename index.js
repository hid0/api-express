const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware log
const log = (req, res, next) => {
  console.log(Date.now() + " " + req.ip + " " + req.originalUrl);
  next();
};
app.use(log);

// routing declaration
const routers = require("./routers");
app.use(routers);

// middleware with 404 page response
const notFound = (req, res, next) => {
  res.json({
    status: "error",
    message: "resource not found",
  });
};
app.use(notFound);

const errorHandling = (err, req, res, next) => {
  res.json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
};
app.use(errorHandling);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

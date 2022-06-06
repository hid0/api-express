const express = require("express");
const routers = express.Router();
const path = require("path");
const cors = require("cors");
const client = require("./connection");
const ObjectId = require("mongodb").ObjectId;

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

routers.get("/products", async (req, res) => {
  if (client.isConnected()) {
    const db = client.db("latihan");
    const products = await db.collection("products").find().toArray();
    if (products.length > 0) {
      // show product lists
      res.send({
        status: "success",
        message: "list products found",
        data: products,
      });
    } else {
      res.send({
        status: "success",
        message: "list products not found",
      });
    }
  } else {
    res.send({
      status: "error",
      message: "db connection failure",
    });
  }
});

routers.post("/product/:id", async (req, res) => {
  if (client.isConnected()) {
    const db = client.db("latihan");
    const id = req.params.id;
    const _id = ObjectId.isValid(id) ? ObjectId(id) : id;
    const product = await db.collection("products").findOne({ _id });
    // show single product
    res.send({
      status: "success",
      message: "show single product",
      data: product,
    });
  } else {
    res.send({
      status: "error",
      message: "db connection failure",
    });
  }
});

routers.post("/product", multer().none(), async (req, res) => {
  if (client.isConnected()) {
    const { name, price, stock, status } = req.body;
    const db = client.db("latihan");

    const result = await db
      .collection("products")
      .insertOne({ name, price, stock, status });
    if (result.insertedCount == 1) {
      res.send({
        status: "success",
        message: "add product successfully",
      });
    } else {
      res.send({
        status: "warning",
        message: "add product failure",
      });
    }
    // show product lists
    res.send("add product");
  } else {
    res.send({
      status: "error",
      message: "db connection failure",
    });
  }
});

routers.put("/product/:id", async (req, res) => {
  if (client.isConnected()) {
    const { name, price, stock, status } = req.body;
    const db = client.db("latihan");

    const result = await db.collection("products").updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: { name, price, stock, status },
      }
    );
    if (result.matchedCount == 1) {
      // show product lists
      res.send({
        status: "success",
        message: "product updated",
      });
    } else {
      res.send({
        status: "warning",
        message: "product update failed",
      });
    }
  } else {
    res.send({
      status: "error",
      message: "db connection failure",
    });
  }
});

routers.delete("/product", async (req, res) => {
  if (client.isConnected()) {
    const db = client.db("latihan");
    const result = await db
      .collection("products")
      .deleteOne({ _id: ObjectId(req.params.id) });
    if (result.deletedCount == 1) {
      res.send({
        status: "success",
        message: "product deleted",
      });
    } else {
      res.send({
        status: "warning",
        message: "product delete failed",
      });
    }
  } else {
    res.send("db connection failure");
  }
});

module.exports = routers;

const express = require("express");
const routers = express.Router();
// const client = require("./connection");
require("./connection");
const Product = require("./Product");
const ObjectId = require("mongodb").ObjectId;
const multer = require("multer");

routers.get("/", (req, res) => res.send("Hello World!"));

// show all product
routers.get("/products", async (req, res) => {
  const products = await Product.find();
  if (products.length > 0) {
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
});

// show single product
routers.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.send({
      status: "success",
      message: "single product",
      data: product,
    });
  } else {
    res.send({
      status: "warning",
      message: "product not found",
    });
  }
});

// add new product
routers.post("/product", multer().none(), async (req, res) => {
  const { name, price, stock, status } = req.body;

  try {
    const product = await Product.create({ name, price, stock, status });
    if (product) {
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
  } catch (error) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
});

// update product
routers.put("/product/:id", multer().none(), async (req, res) => {
  const { name, price, stock, status } = req.body;
  try {
    const result = await Product.updateOne(
      { _id: ObjectId(req.params.id) },
      {
        name,
        price,
        stock,
        status,
      },
      { runValidators: true }
    );
    if (result.ok == 1) {
      res.send({
        status: "success",
        message: "product updated",
        data: result,
      });
    } else {
      res.send({
        status: "warning",
        message: "product update failed",
        data: result,
      });
    }
  } catch (error) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
});

// delete product
routers.delete("/product/:id", async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: ObjectId(req.params.id) });
    if (result.deletedCount == 1) {
      res.send({
        status: "success",
        message: "product deleted",
        data: result,
      });
    } else {
      res.send({
        status: "warning",
        message: "product delete failed",
        data: result,
      });
    }
  } catch (error) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = routers;

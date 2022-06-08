const mongoose = require("mongoose");
const { Schema, model } = mongoose;
mongoose.connect(
  "mongodb://faiz:faiz@localhost:27017/latihan?authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// // create new schema for collection quotes
// const quotesSchema = new Schema({
//   word: String,
// });

// create user schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\S+@\S+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: String,
});

const User = model("User", userSchema);

// // create model for schema quotes
// const Quote = mongoose.model("Quote", quotesSchema);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  // console.log("server db connected!");
  // create new quote
  // const quote = new Quote({ word: "Besar pasak daripada tiang" });

  // // save the quote
  // quote.save((error, quote) => {
  //   if (error) return console.log(error);
  //   console.log(quote);
  // });

  // const products = await Product.find({
  //   status: true,
  // });

  // const product = await Product.findById("62a02332a58ad217afaf73a6");
  // console.log(product);

  // const newProduct = await Product.create({
  //   name: "Co",
  //   price: 900,
  // });
  // console.log(newProduct);
  try {
    const productList = await Product.find()
      .select("name stock")
      .where({ stock: { $gte: 5 } })
      .limit(3)
      .exec();
    console.log(productList);
  } catch (error) {
    console.log(error.message);
  }
});

// try {
//   const newUser = await User.create({
//     username: "john",
//     email: "john.mail.co",
//     password: "12345678",
//   });
// } catch (error) {
//   console.log(error.message);
// }

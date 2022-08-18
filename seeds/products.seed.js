// 1 - Connect to DB
require("../db");

// 2 - Get elements to add
const productsArr = require("./products.json");

// 3 - Add elements
const Products = require("../models/Product.model.js");
const { default: mongoose } = require("mongoose");

const storeProducts = async () => {
  try {
    await Products.insertMany(productsArr);
    console.log("Products added successfully")
    mongoose.connection.close()
  } catch (err) {
    console.log(err);
  }
};

storeProducts();

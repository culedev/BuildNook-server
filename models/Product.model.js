const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String,
    categorie: {
      type: String,
      enum: [
        "power-supply",
        "motherboard",
        "HDD",
        "SSD",
        "graphic-card",
        "ram",
        "pc-tower",
        "fan",
        "liquid-refrigeration",
        "complete-pc",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;

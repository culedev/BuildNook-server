const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    title: String,
    description: String,
    rating: {
      type: Number,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;

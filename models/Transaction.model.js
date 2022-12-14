const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    product: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentIntent: {
      type: String,
    },
    clientSecret: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;

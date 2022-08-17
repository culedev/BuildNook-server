const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    wishList: [{
      type: Schema.Types.ObjectId,
      ref: "Product"
    }],
    shoppingCart: [{
      type: Schema.Types.ObjectId,
      ref: "Product"
    }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

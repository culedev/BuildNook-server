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
    about: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
      default: "https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png"
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

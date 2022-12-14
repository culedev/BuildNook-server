const router = require("express").Router();
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

// GET "/profile" -> Get profile details
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.payload._id)
      .select({
        username: 1,
        email: 1,
        image: 1,
        isBanned: 1,
        shoppingCart: 1,
        wishList: 1,
      })
      .populate("shoppingCart")
      .populate("wishList");
    res.json(foundUser);
  } catch (error) {
    next(error);
  }
});

// PATCH "/profile" -> Edit profile details
router.patch("/", isAuthenticated, async (req, res, next) => {
  const { imageUrl } = req.body;
  try {
    await User.findByIdAndUpdate(req.payload._id, { image: imageUrl });
    res.json("User updated");
  } catch (error) {
    next(error);
  }
});

// GET "/profile/shopping-cart"
router.get("/shopping-cart", isAuthenticated, async (req, res, next) => {
  try {
    const cartProducts = await User.findById(req.payload._id)
      .select({
        shoppingCart: 1,
      })
      .populate("shoppingCart")
    res.json(cartProducts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

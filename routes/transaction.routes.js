const router = require("express").Router();
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

// GET "/transaction"
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const foundCart = await User.findById(req.payload._id)
      .select({
        shoppingCart: 1,
      })
      .populate("shoppingCart");
    res.json(foundCart);
  } catch (error) {
    next(error);
  }
});

// PATCH "/transaction/:productId" -> Modify User ShoppingCart
router.patch("/:productId", isAuthenticated, async (req, res, next) => {
  const { productId } = req.params;

  try {
    const foundUserShoppingCart = await User.findByIdAndUpdate(req.payload._id, {
      $addToSet: { shoppingCart: productId },
    });
    res.json(foundUserShoppingCart);
  } catch (error) {
    next(error);
  }
});

// DELETE "/transactions/:productId/delete" -> Delete product from shopping cart
router.patch("/:productId/delete", isAuthenticated, async (req, res, next) => {
  const {productId} = req.params
    try {
        await User.findByIdAndUpdate(req.payload._id, {$pull: {shoppingCart: productId}})
        res.json("Product removed from shopping cart")
    } catch (error) {
        next(error)
    }
});

module.exports = router;

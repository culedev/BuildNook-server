const router = require("express").Router();
const User = require("../models/User.model")
const Product = require("../models/Product.model")
const isAuthenticated = require("../middlewares/isAuthenticated");

// GET "/wishlist" -> Get all wish list products by user
router.get("/", isAuthenticated, async (req, res, next) => {
    try {
        const allWishList = await User.findById(req.payload._id).populate("Product").select({wishList: 1})
        res.json(allWishList)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
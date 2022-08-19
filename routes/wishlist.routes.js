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

// PATCH "/wishlist/:productId" -> Add product to wish-list
router.patch("/:productId", isAuthenticated, async (req, res, next) => {
    const {productId} = req.params
    try {
        await User.findByIdAndUpdate(req.payload._id, {$addToSet: {wishList: productId}})
        res.json("Product added to wish list")
    } catch (error) {
        next(error)
    }
})

module.exports = router;
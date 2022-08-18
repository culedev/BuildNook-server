const router = require("express").Router();
const User = require("../models/User.model")
const Product = require("../models/Product.model")

// GET "/wishlist/:userId" -> Get all wish list products by user
router.get("/:userId", async (req, res, next) => {
    const {userId} = req.params
    try {
        const allWishList = await User.findById(userId).populate("Product").select({wishList: 1})
        res.json(allWishList)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
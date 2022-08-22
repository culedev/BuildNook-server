const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const profileRoutes = require("./profile.routes")
router.use("/profile", profileRoutes)

const productRoutes = require("./product.routes")
router.use("/products", productRoutes)

const wishListRoutes = require("./wishlist.routes")
router.use("/wishlist", wishListRoutes)

const transactionRoutes = require("./transaction.routes")
router.use("/transaction", transactionRoutes)

const reviewRoutes = require("./reviews.routes")
router.use("/reviews", reviewRoutes)

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)

module.exports = router;

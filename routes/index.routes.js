const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const productRoutes = require("./product.routes")
router.use("/products", productRoutes)

const wishListRoutes = require("./wishlist.routes")
router.use("/wishlist", wishListRoutes)

module.exports = router;

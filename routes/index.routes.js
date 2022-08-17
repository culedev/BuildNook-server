const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const productRoutes = require("./product.routes")
router.use("/products", productRoutes)

module.exports = router;

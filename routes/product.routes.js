const router = require("express").Router();
const Product = require("../models/Product.model");

// GET "/products"
router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.find().select("name", "price", "image");
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
});

// POST "/products" -> Add products
router.post("/", async (req, res, next) => {
  const { name, description, price, image } = req.body;

  if (!name || !description || !price || !image) {
    return res.json({ errorMessage: "Fill the fields" });
  }

  try {
    const addProduct = await Product.create({
      name,
      description,
      price,
      image,
    });
    res.json(addProduct);
  } catch (error) {
    next(error);
  }
});

// PATCH "/products/:productId" -> Edit product
router.patch("/:productId", async (req, res, next) => {
  const { name, description, price, image } = req.body;
  const { productId } = req.params;

  try {
    const editProduct = await Product.findByIdAndUpdate(productId, {
      name,
      description,
      price,
      image,
    });
    res.json("Updated successfully");
  } catch (error) {
    next(error);
  }
});

// DELETE "/products/:productId" -> Delete product
router.delete("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

// PATCH "/product/:productId/addcart" -> Update product to User Shopping Cart
router.patch("/:productId/addcart", async (req, res, next) => {
    const {productId} = req.params

    try {
        const addProductToCart = await User.findByIdAndUpdate(userId, {$push: {shoppingCart: productId}})
        res.json(addProductToCart)
    } catch (error) {
        next(error)
    }
})
module.exports = router;

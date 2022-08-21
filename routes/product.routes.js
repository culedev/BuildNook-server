const router = require("express").Router();
const Product = require("../models/Product.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

// GET "/products"
router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.find().select({name: 1, price: 1, image: 1, categorie: 1});
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
router.patch("/:productId", isAuthenticated, async (req, res, next) => {
  const { name, description, price, image } = req.body;
  const { productId } = req.params;

  try {
    await Product.findByIdAndUpdate(productId, {
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
router.delete("/:productId", isAuthenticated, async (req, res, next) => {
  const { productId } = req.params;
  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

// GET "/products/:categorie" -> Filter products by categorie
router.get("/:categorie", async (req,res,next) => {
  const {categorie} = req.params
  try {
    const filteredProducts = await Product.find({categorie: categorie})
    res.json(filteredProducts)
  } catch (error) {
    next(error)
  }
})

// GET "/products/:productId/details" -> get product details
router.get("/:productId/details", async (req, res, next) => {
  const {productId} = req.params

  try {
    const productDetails = await Product.findById(productId)
    res.json(productDetails)
  } catch (error) {
    next(error)
  }
})

module.exports = router;

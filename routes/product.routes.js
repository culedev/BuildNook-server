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
router.delete("/:productId", isAuthenticated, async (req, res, next) => {
  const { productId } = req.params;
  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

// PATCH "/products/:productId/addcart" -> Update product to User Shopping Cart
// TODO FALTA INTRODUCIR EL ID DEL USER
router.patch("/:productId/addcart", isAuthenticated, async (req, res, next) => {
    const {productId} = req.params

    try {
        const addProductToCart = await User.findByIdAndUpdate(req.payload._id, {$push: {shoppingCart: productId}})
        res.json("product added")
    } catch (error) {
        next(error)
    }
})
module.exports = router;

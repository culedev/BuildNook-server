const router = require("express").Router();
const User = require("../models/User.model");
const Transaction = require("../models/Transaction.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const stripe = require("stripe")(
  "sk_test_51LZa7LDzSkiitMALne9TYMZ9R4ckWmn0wuhCH5XUvkGeqfsncpeYNUh56D5ID4ufGYwU72SPcRVcDuH6cDeBeLjy0023keda5g"
);

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
    const foundUserShoppingCart = await User.findByIdAndUpdate(
      req.payload._id,
      {
        $addToSet: { shoppingCart: productId },
      }
    );
    res.json(foundUserShoppingCart);
  } catch (error) {
    next(error);
  }
});

// DELETE "/transaction/:productId/delete" -> Delete product from shopping cart
router.patch("/:productId/delete", isAuthenticated, async (req, res, next) => {
  const { productId } = req.params;
  try {
    await User.findByIdAndUpdate(req.payload._id, {
      $pull: { shoppingCart: productId },
    });
    res.json("Product removed from shopping cart");
  } catch (error) {
    next(error);
  }
});

const calculateOrderAmount = (items) => {
  const amount = items.reduce((acc, eachItem) => {
    return acc + eachItem.price * 100;
  }, 0);
  return amount;
};

// POST "/transaction/create-payment-intent"
router.post("/create-payment-intent", isAuthenticated, async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency

  const products = await User.findById(req.payload._id).populate(
    "shoppingCart"
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(products.shoppingCart),
    currency: "eur",
    payment_method_types: ["card"],
  });

  await Transaction.create({
    paymentIntent: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
    user: req.payload._id,
    product: items,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// PATCH "/transaction/success"
router.patch("/", isAuthenticated, async (req, res, next) => {
  const { client, payment } = req.body;
  try {
    await Transaction.findOneAndUpdate(
      {
        clientSecret: client,
        paymentIntent: payment,
      },
      { isPaid: true }
    );

    await User.findByIdAndUpdate(req.payload._id, { shoppingCart: [] });

    res.json("Payment done successfully");
  } catch (error) {
    next(error);
  }
});
module.exports = router;

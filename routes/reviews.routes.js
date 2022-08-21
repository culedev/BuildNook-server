const router = require("express").Router();
const Review = require("../models/Review.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

// GET "/reviews/:productId" -> Give all reviews
router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const getAllReviews = await Review.find({ product: productId }).populate(
      "user",
      { username: 1, role: 1, image: 1 }
    );

    res.json(getAllReviews);
  } catch (error) {
    next(error);
  }
});

// POST "/reviews/:productId" -> Create a review
router.post("/:productId", isAuthenticated, async (req, res, next) => {
  const { productId } = req.params;
  const { title, description, rating } = req.body;

  try {
    await Review.create({
      title,
      description,
      rating,
      product: productId,
      user: req.payload._id,
    });
    res.json("Review created successfully");
  } catch (error) {
    next(error);
  }
});

// DELETE "/reviews/:reviewId" -> Delete a review
router.delete("/:reviewId", isAuthenticated, async (req, res, next) => {
  const { reviewId } = req.params;

  try {
    await Review.findOneAndDelete({
      $and: [{ user: req.payload._id }, { _id: reviewId }],
    });
    res.json("Review deleted successfully");
  } catch (error) {
    next(error);
  }
});

// GET "/reviews/:productId/rating" -> Get Avg Rating
router.get("/:productId/rating", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const getAllReviews = await Review.find({ product: productId })
    const avgRating = getAllReviews.reduce((avg, eachReview) => {
      return avg + eachReview.rating / getAllReviews.length;
    }, 0);

    const getAvgRating = {
      rating: Math.round(avgRating),
      length: getAllReviews.length,
    };

    res.json(getAvgRating);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

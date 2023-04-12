const mongoose = require('mongoose');

const shopReviewSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ShopReview = mongoose.model('ShopReview', shopReviewSchema);

module.exports = ShopReview;

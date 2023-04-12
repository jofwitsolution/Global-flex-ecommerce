const mongoose = require('mongoose');

const productReviewSchema = new mongoose.Schema(
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

const ProductReview = mongoose.model('ProductReview', productReviewSchema);

module.exports = ProductReview;

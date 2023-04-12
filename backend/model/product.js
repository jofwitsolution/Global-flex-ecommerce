const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    briefDescription: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
    },
    originalPrice: {
      type: Number,
      required: [true, 'Please enter original price!'],
    },
    discountPrice: {
      type: Number,
      required: [true, 'Please enter discount price!'],
    },
    numberInStock: {
      type: Number,
      required: true,
    },
    soldOut: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: {
          url: { type: String },
          public_id: { type: String },
        },
        required: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    brand: {
      type: String,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    rating: {
      type: Number,
      default: 4,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductReview',
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

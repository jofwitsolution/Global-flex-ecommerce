const mongoose = require('mongoose');

const shippingOptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedDeliveryTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ShippingOption = mongoose.model('ShippingOption', shippingOptionSchema);

module.exports = ShippingOption;

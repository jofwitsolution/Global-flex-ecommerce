const express = require('express');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const Category = require('../model/category');

// get all categories
router.get(
  '/',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const categories = await Category.find({});

      res.status(200).json({
        success: true,
        categories,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;

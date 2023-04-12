const express = require('express');
const { isSeller } = require('../middleware/auth');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const Category = require('../model/category');
const Product = require('../model/product');
const Shop = require('../model/shop');
const { upload } = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const fs = require('fs');
const cloudinary = require('../utils/cloudinary');
const {
  validateProductCreate,
  validateProductUpdate,
} = require('../form_validation/productValidation');
const setCookies = require('../utils/setCookie');
const { conn } = require('../db/Database');
const { randomNumber } = require('../utils/random');

// create product
router.post(
  '/create-product',
  isSeller,
  upload.array('images', 5),
  catchAsyncErrors(async (req, res, next) => {
    try {
      setCookies(req.seller, req, 'seller_token');
      const error = await validateProductCreate(req.body);
      if (error) {
        return next(new ErrorHandler(error, 400));
      }
      const shop = await Shop.findById(req.seller._id);
      if (!shop) {
        return next(new ErrorHandler('Shop Id is invalid!', 400));
      }

      if (req.files.length < 1) {
        return next(
          new ErrorHandler('Upload at least one product image!', 400)
        );
      }

      // Cloudinary file upload
      const promises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path)
      );
      const results = await Promise.all(promises); // returns list of uploaded images data
      const images = [];
      results.forEach((image) => {
        images.push({
          url: image.url,
          public_id: image.public_id,
        });
      });

      // console.log(images);
      const productData = req.body;
      // replace all special characters
      let productUrl = productData.name.trim();
      productUrl = productUrl.replace(/[^a-zA-Z0-9 ]/g, '');
      productUrl = productUrl.replace(/\s+/g, '-');
      productUrl = productUrl + '-' + randomNumber();

      const product = await Product.create({
        name: productData.name,
        url: productUrl,
        briefDescription: productData.briefDescription,
        fullDescription: productData.fullDescription,
        category: productData.category,
        tags: productData.tags,
        brand: productData.brand,
        originalPrice: productData.originalPrice,
        discountPrice: productData.discountPrice,
        numberInStock: productData.numberInStock,
        shop: shop._id,
        images: images,
      });

      shop.products.push(product._id);
      await shop.save();

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// update product
router.put(
  '/:product_id/update',
  isSeller,
  upload.array('images', 5),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product_id = req.params.product_id;

      const error = await validateProductUpdate(req.body);
      if (error) {
        return next(new ErrorHandler(error, 400));
      }
      const shop = await Shop.findById(req.seller._id);
      if (!shop) {
        return next(new ErrorHandler('Shop not found!', 400));
      }
      const product = await Product.findById(product_id);
      if (!product) {
        return next(new ErrorHandler('Product not found!', 404));
      }

      if (shop._id.toString() !== product.shop.toString()) {
        return next(
          new ErrorHandler(
            'You are not authorized to update this product!',
            401
          )
        );
      }

      const images = [];
      // if there is new product image
      if (req.files.length > 1) {
        // delete existing product image
        const deletedPromises = product.images.map((image) =>
          cloudinary.uploader.destroy(image.public_id)
        );
        const deletedResults = await Promise.all(deletedPromises);

        // Cloudinary file upload new product images
        const promises = req.files.map((file) =>
          cloudinary.uploader.upload(file.path)
        );
        const results = await Promise.all(promises); // returns list of uploaded images data
        results.forEach((image) => {
          images.push({
            url: image.url,
            public_id: image.public_id,
          });
        });
      }

      // console.log(images);
      const productData = req.body;
      // replace all special characters
      let productUrl = productData.name.trim();
      productUrl = productUrl.replace(/[^a-zA-Z0-9 ]/g, '');
      productUrl = productUrl.replace(/\s+/g, '-');
      productUrl = productUrl + '-' + randomNumber();

      product.name = productData.name;
      product.url = productUrl;
      product.briefDescription = productData.briefDescription;
      product.fullDescription = productData.fullDescription;
      product.category = productData.category;
      product.tags = productData.tags;
      product.brand = productData.brand;
      product.originalPrice = productData.originalPrice;
      product.discountPrice = productData.discountPrice;
      product.numberInStock = productData.numberInStock;

      if (images.length > 0) {
        product.images = images;
      }

      await product.save();

      res.status(201).json({
        success: true,
        product,
        message: 'product updated successfully',
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products of a shop
router.get(
  '/shop/:id',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shop: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product of a shop
router.delete(
  '/:product_id/shop/:shop_id',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const session = await conn.startSession();

    try {
      session.startTransaction();

      const productId = req.params.product_id;
      const shopId = req.params.shop_id;

      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler('Shop not found!', 404));
      }

      const product = await Product.findById(productId);
      if (!product) {
        return next(new ErrorHandler('Product not found!', 404));
      }

      if (shop._id.toString() !== product.shop.toString()) {
        return next(
          new ErrorHandler(
            'You are not authorized to delete this product!',
            401
          )
        );
      }

      const productIndex = shop.products.indexOf(product._id);
      shop.products.splice(productIndex, 1);
      await shop.save({ session });

      await product.deleteOne({ session });

      const promises = product.images.map((image) =>
        cloudinary.uploader.destroy(image.public_id)
      );
      const result = await Promise.all(promises);

      await session.commitTransaction();

      res.status(201).json({
        success: true,
        message: 'Product Deleted successfully!',
      });
    } catch (error) {
      await session.abortTransaction();
      return next(new ErrorHandler(error, 400));
    } finally {
      session.endSession();
    }
  })
);

// get all products
router.get(
  '/',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const pageSize = req.query.pageSize || 20;
      const page = req.query.page || 1;
      const products = await Product.find()
        .populate({
          path: 'shop',
          select: '-password -email -role',
        })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get products filtered by field: ?field=productField&keyword=keyword&qty=qty
router.get(
  '/filter-by/any',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const field = req.query.field;
      // if the field is category, it's an object ID field (options is not supported)
      const keyword =
        req.query.keyword && field === 'category'
          ? req.query.keyword
          : req.query.keyword
          ? {
              $regex: req.query.keyword,
              $options: 'i',
            }
          : {
              $regex: '_',
              $options: 'i',
            };

      const qty = req.query.qty;
      const products = await Product.find({ [field]: keyword })
        .populate({
          path: 'shop',
          select: '-password -email -role',
        })
        .limit(qty);

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// search products : ?keyword
router.get(
  '/search',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const pageSize = Number(req.query.pageSize) || 10;
      const page = Number(req.query.page) || 1; // current page

      const keyword = req.query.keyword
        ? {
            $regex: req.query.keyword,
            $options: 'i',
          }
        : {
            $regex: '_',
            $options: 'i',
          };

      const count = await Product.countDocuments({
        $or: [
          { name: { ...keyword } },
          { tags: { ...keyword } },
          { brand: { ...keyword } },
        ],
      });
      const products = await Product.find({
        $or: [
          { name: { ...keyword } },
          { tags: { ...keyword } },
          { brand: { ...keyword } },
        ],
      }).limit(pageSize);

      const pages = Math.ceil(count / pageSize); //total pages
      const hasNextPage = page < pages;

      res.status(201).json({
        success: true,
        products,
        totalProducts: count,
        page,
        pages,
        hasNextPage,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get products filtered by best deals
router.get(
  '/filter-by/best-deals',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const pageSize = req.query.pageSize || 5;
      const page = req.query.page || 1;
      const products = await Product.find({ soldOut: { $gt: 49 } })
        .populate({
          path: 'shop',
          select: '-password -email -role',
        })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get products filtered by best selling
router.get(
  '/filter-by/best-selling',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const pageSize = req.query.pageSize || 5;
      const page = req.query.page || 1;
      const products = await Product.find({ soldOut: { $gt: 49 } })
        .populate({
          path: 'shop',
          select: '-password -email -role',
        })
        .sort({ soldOut: -1 }) // Sort by soldOut field in descending order
        .limit(pageSize)
        .skip(pageSize * (page - 1));

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get products by category
router.get(
  '/category',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const categoryUrl = req.query.categoryUrl;
      const pageSize = req.query.pageSize || 5;
      const page = req.query.page || 1;

      const category = await Category.findOne({ url: categoryUrl });
      if (!category) {
        return next(new ErrorHandler('Category not exist', 404));
      }

      const products = await Product.find({ category: category._id })
        .populate({
          path: 'shop',
          select: '-password -email -role',
        })
        .sort({ soldOut: -1 }) // Sort by soldOut field in descending order
        .limit(pageSize)
        .skip(pageSize * (page - 1));

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get a single product: ?name=productName
router.get(
  '/product',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const name = req.query.name;
      console.log(name);
      const regex = new RegExp(name, 'i'); // 'i' flag for case-insensitive search
      const product = await Product.findOne({
        url: { $regex: regex },
      }).populate({
        path: 'shop',
        select: '-password -email -role',
      });

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get product by id
router.get(
  '/:id/product',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id).populate({
        path: 'shop',
        select: '-password -email -role',
      });

      if (!product) {
        return next(new ErrorHandler('Product not exist', 404));
      }

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;

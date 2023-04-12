const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const sendToken = require('../utils/jwtToken');
const Shop = require('../model/shop');
const { isAuthenticated, isSeller } = require('../middleware/auth');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const sendShopToken = require('../utils/shopToken');
const {
  validateShopCreate,
  validateShopLogin,
  validateShopProfile,
} = require('../form_validation/shopValidation');
const { upload } = require('../multer');
const cloudinary = require('../utils/cloudinary');
const { randomNumber } = require('../utils/random');

// create shop
router.post('/create-shop', async (req, res, next) => {
  try {
    const error = await validateShopCreate(req.body);
    if (error) {
      return next(new ErrorHandler(error, 400));
    }

    const { email } = req.body;

    const shop = await Shop.findOne({ email });
    if (shop) {
      return next(new ErrorHandler('Shop already exists', 400));
    }

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `${process.env.CLIENT_URL}/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: 'Activate your Shop',
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your shop!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: '5m',
  });
};

// activate shop
router.post(
  '/activation',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler('Invalid token', 400));
      }
      const { name, email, password, zipCode, address, phoneNumber } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler('Shop already exists', 400));
      }

      let shopUrl = name.trim();
      shopUrl = shopUrl.replace(/[^a-zA-Z0-9 ]/g, '');
      shopUrl = shopUrl.replace(/\s+/g, '-');
      shopUrl = shopUrl + '-' + randomNumber();

      seller = await Shop.create({
        name,
        url: shopUrl,
        email,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      seller.password = undefined;

      sendShopToken(seller, 201, res, req);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login shop
router.post(
  '/login-shop',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const error = await validateShopLogin(req.body);
      if (error) {
        return next(new ErrorHandler(error, 400));
      }

      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler('Please provide all fields!', 400));
      }

      const shop = await Shop.findOne({ email }).select('+password');

      if (!shop) {
        return next(new ErrorHandler("Shop doesn't exists!", 400));
      }

      const isPasswordValid = await shop.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler('Invalid email or password', 400));
      }

      shop.password = undefined;

      sendShopToken(shop, 201, res, req);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load shop
router.get(
  '/getSeller',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id).select('-password');

      if (!seller) {
        return next(new ErrorHandler("Shop doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// shop update profile
router.patch(
  '/update-profile',
  isSeller,
  upload.single('file'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const error = await validateShopProfile(req.body);
      if (error) {
        return next(new ErrorHandler(error, 400));
      }

      let shop = await Shop.findById(req.seller.id).select('-password');
      if (!shop) {
        return next(new ErrorHandler("Shop doesn't exists", 400));
      }

      let cloudResponse;
      const filePath = req.file ? req.file.path : undefined;
      // If seller upload an avatar
      if (filePath) {
        // If seller already has an avatar, replace it
        if (shop.avatar?.url) {
          cloudResponse = await cloudinary.uploader.upload(filePath, {
            public_id: shop.avatar.public_id,
          });
          shop.avatar = {
            url: cloudResponse.url,
            public_id: cloudResponse.public_id,
          };
        } else {
          cloudResponse = await cloudinary.uploader.upload(filePath);
          shop.avatar = {
            url: cloudResponse.url,
            public_id: cloudResponse.public_id,
          };
        }
      }

      let shopUrl = req.body.name.trim();
      shopUrl = shopUrl.replace(/[^a-zA-Z0-9 ]/g, '');
      shopUrl = shopUrl.replace(/\s+/g, '-');
      shopUrl = shopUrl + '-' + randomNumber();

      shop.name = req.body.name;
      shop.url = shopUrl;
      shop.phoneNumber = req.body.phoneNumber;
      shop.address = req.body.address;
      shop.zipCode = req.body.zipCode;
      shop.description = req.body.description;
      shop = await shop.save();

      res.status(200).json({
        success: true,
        message: 'Shop updated successfully',
        seller: shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out seller
router.get(
  '/logout',
  catchAsyncErrors(async (req, res, next) => {
    try {
      req.session.cookie.maxAge = 0;
      req.session.cookie.expires = new Date(Date.now() - 86000000);
      res.status(201).json({
        success: true,
        message: 'Log out successful!',
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;

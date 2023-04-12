const express = require('express');
const User = require('../model/user');
const router = express.Router();
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const sendToken = require('../utils/jwtToken');
const { isAuthenticated } = require('../middleware/auth');
const {
  validateLogin,
  validateSignup,
  validateUserProfile,
} = require('../form_validation/userValidation');
const { upload } = require('../multer');
const cloudinary = require('../utils/cloudinary');

router.post('/create-user', async (req, res, next) => {
  try {
    const error = await validateSignup(req.body);
    if (error) {
      return next(new ErrorHandler(error, 400));
    }

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler('User already exists', 400));
    }

    user = {
      name: name,
      email: email,
      password: password,
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `${process.env.CLIENT_URL}/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: 'Activate your account',
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: '5m',
  });
};

// activate user
router.post(
  '/activation',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const activation_token = req.body?.activation_token;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler('Invalid token', 400));
      }
      const { name, email, password } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler('User already exists', 400));
      }
      user = await User.create({
        name,
        email,
        password,
      });

      sendToken(user, 201, res, req);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user
router.post(
  '/login-user',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const error = await validateLogin(req.body);
      if (error) {
        return next(new ErrorHandler(error, 400));
      }

      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler('Please provide all fields!', 400));
      }

      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return next(new ErrorHandler('Invalid email or password!', 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler('Invalid email or password!', 400));
      }

      user.password = undefined;

      sendToken(user, 201, res, req);
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  '/getuser',
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select('-password');

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// user update profile
router.patch(
  '/update-profile',
  isAuthenticated,
  upload.single('file'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log(req.body);
      const error = await validateUserProfile(req.body);
      if (error) {
        return next(new ErrorHandler(error, 400));
      }

      let user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      let cloudResponse;
      const filePath = req.file ? req.file.path : undefined;
      // If user upload an avatar
      if (filePath) {
        // If user already has an avatar, replace it
        if (user.avatar?.url) {
          cloudResponse = await cloudinary.uploader.upload(filePath, {
            public_id: user.avatar.public_id,
          });
          user.avatar = {
            url: cloudResponse.url,
            public_id: cloudResponse.public_id,
          };
        } else {
          cloudResponse = await cloudinary.uploader.upload(filePath);
          user.avatar = {
            url: cloudResponse.url,
            public_id: cloudResponse.public_id,
          };
        }
      }

      user.name = req.body.name;
      user.phoneNumber = req.body.phoneNumber;
      user.address = req.body.address;
      user = await user.save();

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out user
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

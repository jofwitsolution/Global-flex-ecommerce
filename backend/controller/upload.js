const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Shop = require('../model/shop');
const User = require('../model/user');

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload shop avatar
router.post('/shop-avatar', upload.single('file'), async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.seller._id).select('-password');
    if (!seller) {
      return next(new ErrorHandler("Shop doesn't exists", 400));
    }

    let cloudResponse;
    const filePath = req.file ? req.file.path : undefined;
    // If seller upload an avatar
    if (filePath) {
      // If seller already has an avatar, replace it
      if (seller.avatar?.url) {
        cloudResponse = await cloudinary.uploader.upload(filePath, {
          public_id: seller.avatar.public_id,
        });
        seller.avatar = {
          url: cloudResponse.url,
          public_id: cloudResponse.public_id,
        };
      } else {
        cloudResponse = await cloudinary.uploader.upload(filePath);
        seller.avatar = {
          url: cloudResponse.url,
          public_id: cloudResponse.public_id,
        };
      }
    }

    return res.json({ message: 'done', result });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

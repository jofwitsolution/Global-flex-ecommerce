// create token and saving that in cookies
const sendShopToken = (shop, statusCode, res, req) => {
  const token = shop.getJwtToken();

  req.session.seller_token = token;

  res.status(statusCode).json({
    success: true,
    seller: shop,
    token,
  });
};

module.exports = sendShopToken;

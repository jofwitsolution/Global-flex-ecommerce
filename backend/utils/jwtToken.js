// create token and saving that in cookies
const sendToken = (user, statusCode, res, req) => {
  const token = user.getJwtToken();

  // const date = 90 * 24 * 60 * 60 * 1000;
  // req.session.cookie.maxAge = date;
  req.session.token = token;

  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;

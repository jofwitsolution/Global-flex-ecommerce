function setCookies(user, req, subject) {
  const token = user.getJwtToken();

  req.session[subject] = token;
}

module.exports = setCookies;

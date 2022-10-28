exports.userIsLoginMiddleware = (req, res, next) => {
  if (auth.user() != null) {
    return response.redirect(route("home"));
  }
  next();
};

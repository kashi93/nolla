exports.default = (req, res, next) => {
  if (auth.user() == null) {
    return response.redirect(route("login"));
    // return response.status(403).json({
    //   status: "Error",
    //   message: "Unauthenticated",
    //   data: {},
    // });
  }
  next();
};

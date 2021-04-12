// middleware to verify user is logged in before access given
const withAuth = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login-signup");
  } else {
    next();
  }
};

module.exports = withAuth;

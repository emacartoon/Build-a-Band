const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the bandroute
  if (!req.session.logged_in) {
    res.redirect('/band');
  } else {
    next();
  }
};

module.exports = withAuth;

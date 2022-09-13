module.exports = {
  //  If user isn't a admin
  isAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.admin == 1) {
      return next();
    }

    res.redirect("/");
  },

  //  If user isn't loged
  isUser: function (req, res, next) {
    if (req.isAuthenticated() && req.user) {
      return next();
    }
    res.redirect("../user/login");
  },
};

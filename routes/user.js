//  Load modules
const express = require("express");

//  Applications
const router = express.Router();

//  Register page
router.get("/register", (req, res) => {
  //  If have an error in the register (loaded the errors messages)
  if (req.session.registerErrors) {
    let arrayRegisterErrors = req.session.registerErrors;
    req.session.registerErrors = "";
    res.render("user/register", { registerErrorMessage: arrayRegisterErrors });
  }

  //  If email already exist
  else if (req.session.alreadyExistingEmail) {
    req.session.alreadyExistingEmail = false;
    res.render("user/register", { emailErrorMessage: true });
  }

  //  If register was success
  else if (req.session.registeredUser) {
    req.session.registeredUser = false;
    res.render("user/login", { registerSuccessMessage: true });
  }

  //  Just loaded the page
  else {
    res.render("user/register");
  }
});

//  Login page
router.get("/login", (req, res) => {
  //  If register success
  if (req.session.registeredUser) {
    //  register success message
    req.session.registeredUser = false;
    res.render("user/login", { registerSuccessMessage: true });
  } else if (req.session.loginError) {
    let arrayLoginError = req.session.loginError;
    req.session.loginError = "";
    res.render("user/login", { lLoginErrorMessage: arrayLoginError });
  }

  //  Just loaded the login page
  else {
    res.render("user/login");
  }
});

//  Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    console.log("logout");
  });
  res.redirect("/");
});

module.exports = router;

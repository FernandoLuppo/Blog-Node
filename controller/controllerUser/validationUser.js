//  Load modules
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");

//  Collection
require("../../models/User");
const User = mongoose.model("users");

//  PG - Register
router.post("/register", (req, res) => {
  let userName = req.body.name;
  let userEmail = req.body.email;
  let UserPassword = req.body.password;
  let repeatPassword = req.body.repeatPassword;

  //  Validation
  let registerErrors = [];

  //  Name Validation
  if (userName === "" || userName === null || userName === undefined) {
    registerErrors.push({ registerErrorsMessage: "Nome não pode estar vazio" });
  }

  //  Email Validation
  userEmail = userEmail.trim();

  if (userEmail === "" || userEmail === null || userEmail === undefined) {
    registerErrors.push({
      registerErrorsMessage: "Email não pode estar vazio",
    });
  }

  //  Password Validation
  if (
    UserPassword === "" ||
    UserPassword === null ||
    UserPassword === undefined
  ) {
    registerErrors.push({
      registerErrorsMessage: "Senha não pode estar vazio",
    });
  }

  if (UserPassword.length < 4) {
    registerErrors.push({
      registerErrorsMessage: "Senha deve ter no mínimo 5 caracteres",
    });
  }

  //  RepeatPassword Validation
  if (repeatPassword != UserPassword) {
    registerErrors.push({
      registerErrorsMessage: "As senhas não são iguais. Tente novamente",
    });
  }

  //    If Error
  if (registerErrors.length > 0) {
    console.log(registerErrors);
    req.session.registerErrors = registerErrors;
    res.redirect("../../user/register");
  }

  //    If Success
  else {
    User.findOne({ email: userEmail })
      .then((users) => {
        //  If email already been taken
        if (users) {
          req.session.alreadyExistingEmail = true;
          res.redirect("../../user/register");
        }

        //  Creating a new user
        else {
          let encrypted = bcryptjs.genSaltSync(10);

          const newUser = {
            name: userName,
            email: userEmail,

            password: bcryptjs.hashSync(UserPassword, encrypted),
          };

          new User(newUser)
            .save()
            .then(() => {
              console.log("User registered with success!");
              req.session.registeredUser = true;
              res.redirect("../../user/register");
            })
            .catch((error) => {
              console.log(
                "There was an error to try register the user " + error
              );
              res.redirect("../../user/register");
            });
        }
      })
      .catch((error) => {
        console.log("There was inside error " + error);
      });
  }
});

router.post("/login", (req, res, next) => {
  let userEmail = req.body.email;
  let userPassword = req.body.password;

  //  Validation
  let loginError = [];

  //  Email validation
  if (userEmail === "" || userEmail === null || userEmail === undefined) {
    loginError.push({ loginErrorMessage: "Email não pode estar vazio" });
  }

  //  Password validation
  if (
    userPassword === "" ||
    userPassword === null ||
    userPassword === undefined
  ) {
    loginError.push({ loginErrorMessage: "Senha não pode estar vazio" });
  }

  //  If login was some error
  if (loginError.length > 0) {
    req.session.loginError = loginError;
    res.redirect("../../user/login");
  }

  //  User state validation
  else {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/user/login",
      failureFlash: true,
    })(req, res, next);
  }
});

module.exports = router;

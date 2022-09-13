//  Load modules
const localStrategy = require("passport-local");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

//  Collection
require("../models/User");
const User = mongoose.model("users");

module.exports = function (passport) {
  //  Authentication based in email
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      //  Compar user email with banc email
      User.findOne({ email: email }).then((user) => {
        //  If user email and banc email don't match
        if (!user) {
          return done(null, false, { message: "Essa conta não existe" });
        }

        //  If user email and banc email match
        else {
          //  Compar the user password and banc password
          bcryptjs.compare(password, user.password, (error, match) => {
            //  If user password and banc password match
            //  Valid user
            if (match) {
              return done(null, user);
            }

            //  Don't valid user
            else {
              return done(null, false, { message: "Senha incorreta" });
            }
          });
        }
      });
    })
  );

  //  Save user datas
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //    Search a user by id
  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};

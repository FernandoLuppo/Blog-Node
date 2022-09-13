//  Load modules
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

//  Collection
require("./models/Category");
require("./models/Post");
const Category = mongoose.model("categories");
const Post = mongoose.model("posts");

//  Applications
const app = express();
const path = require("path");
const controllerAdmin = require("./controller/controllerAdmin/validationAdmin");
const controllerUser = require("./controller/controllerUser/validationUser");
const admin = require("./routes/admin");
const user = require("./routes/user");
require("./config/auth")(passport);
const { isUser } = require("./helpers/userType");
const PORT = 8080;

//  Session Config
app.use(
  session({
    secret: "key2002",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//  Middleware
app.use((req, res, next) => {
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;

  next();
});

//  Body-Parser Config
app.use(bodyParser.urlencoded({ extended: false }));

//  Handlebars Config
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");

//  Mongoose Config
mongoose
  .connect("mongodb://localhost/blogApp")
  .then(() => {
    console.log("Connected with Successful");
  })
  .catch((error) => {
    console.log("There was an error to try connect with server " + error);
  });

//  Statics files Config
app.use(express.static(path.join(__dirname, "public")));

//  Home Pages
//  Category
//  Category Home page
app.get("/category", isUser, (re, res) => {
  Category.find()
    .lean()
    .then((categories) => {
      res.render("categories/index", { category: categories });
    })
    .catch((error) => {
      console.log(
        "There was an erro to try loaded te category's page " + error
      );
      res.redirect("/");
    });
});

//  opening a specific page based on the slug passed
app.get("/category/:slug", isUser, (req, res) => {
  Category.findOne({ slug: req.params.slug })
    .lean()
    .then((categories) => {
      if (categories) {
        Post.find({ category: categories._id })
          .lean()
          .then((posts) => {
            res.render("categories/posts", {
              category: categories,
              post: posts,
            });
          })
          .catch((error) => {
            console.log("There was an error to try list the posts " + error);
            res.redirect("/");
          });
      } else {
        req.session.nonexistentCategory = true;
        res.redirect("/");
      }
    })
    .catch((error) => {
      console.log("There was an inside error to try loaded this page " + error);
      res.redirect("/");
    });
});

//  Home
app.get("/", (req, res) => {
  //  If don't have the post
  if (req.session.nonexistentPost) {
    req.session.nonexistentPost = "";
    Post.find()
      .sort({ data: "desc" })
      .lean()
      .populate("category")
      .then((posts) => {
        res.render("index", {
          post: posts,
          nonexistentPost: true,
        });
      })
      .catch((error) => {
        console.log("There was a inside error " + error);
        res.redirect("/");
      });
  }

  //  Just loaded the page
  else {
    Post.find()
      .sort({ data: "desc" })
      .lean()
      .populate("category")
      .then((posts) => {
        res.render("index", { post: posts });
      });
  }
});

//  Post
//  opening a specific page based on the slug passed
app.get("/post/:slug", isUser, (req, res) => {
  Post.findOne({ slug: req.params.slug })
    .lean()
    .then((posts) => {
      if (posts) {
        res.render("post/index", { post: posts });
      } else {
        req.session.nonexistentPost = true;
        res.redirect("/");
      }
    });
});

//  Routes
app.use("/admin", admin);
app.use("/user", user);
app.use("/controller", controllerAdmin);
app.use("/controller", controllerUser);

//  Others
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

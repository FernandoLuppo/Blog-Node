//  Load modules
const express = require("express");
const mongoose = require("mongoose");

//  Collection
require("../models/Category");
require("../models/Post");
const Category = mongoose.model("categories");
const Post = mongoose.model("posts");

//  Applications
const router = express.Router();
const { isAdmin } = require("../helpers/userType");

//  Categories pages
router.get("/", isAdmin, (req, res) => {
  //  Edit Category
  //  If have an error in the edit pages (loaded the errors messages)
  if (req.session.editCategoryError) {
    let arrayEditCategoryError = req.session.editCategoryError;
    req.session.editCategoryError = "";
    Category.find()
      .sort({ date: "desc" })
      .lean()
      .then((categories) => {
        return res.render("admin/categories", {
          Category: categories,
          editCategoryErrorMessage: arrayEditCategoryError,
        });
      })
      .catch((error) => {
        console.log(
          "There was an error to try loaded the banc information's (Edit Category error messages) " +
            error
        );
      });
  }

  //  If have success in edit a category (loaded the success message)
  else if (req.session.editSuccess) {
    req.session.editSuccess = false;
    Category.find()
      .sort({ date: "desc" })
      .lean()
      .then((categories) => {
        return res.render("admin/categories", {
          Category: categories,
          editCategoriesSuccessMessage: true,
        });
      })
      .catch((error) => {
        console.log(
          "There was an error to try loaded the banc information's (Edit Category edit success) " +
            error
        );
      });
  }

  //  Delete Category
  else if (req.session.deleteMessage) {
    req.session.deleteMessage = false;
    Category.find()
      .sort({ date: "desc" })
      .lean()
      .then((categories) => {
        return res.render("admin/categories", {
          Category: categories,
          deleteCategoryMessage: true,
        });
      })
      .catch((error) => {
        console.log(
          "There was an error to try loaded the banc information's (Delete Category) " +
            error
        );
      });
  }

  //  Just Loaded the Collection
  else {
    Category.find()
      .sort({ date: "desc" })
      .lean()
      .then((categories) => {
        res.render("admin/categories", { Category: categories });
      })
      .catch((error) => {
        console.log(
          "There was an error to try loaded the banc information's " + error
        );
      });
  }
});

//  Categories Edit pages
router.get("/categories/add", isAdmin, (req, res) => {
  //  If Error in create a new category (loaded the errors message)
  if (req.session.categoryError) {
    console.log("Mensagem de erro");
    let arrayCategoryError = req.session.categoryError;
    req.session.categoryError = "";

    return res.render("admin/addCategories", {
      addCategoriesErrorMessage: arrayCategoryError,
    });
  }

  //  If create new category have success (loaded the success message)
  else if (req.session.success) {
    console.log("Mensagem de ok");
    req.session.success = false;
    return res.render("admin/addCategories", {
      addCategoriesSuccessMessage: true,
    });
  }

  //  Just loaded the Add Categories page
  else {
    res.render("admin/addCategories");
  }
});

router.get("/categories/edit/:id", isAdmin, (req, res) => {
  //  loaded the model referent the id params
  Category.findOne({ _id: req.params.id })
    .lean()
    .then((categories) => {
      res.render("admin/editCategories", {
        categories: categories,
      });
    })
    .catch((error) => {
      console.log("There was an erro to try edit the category " + error);
      res.redirect("/admin/categories");
    });
});

//  Posts Pages
router.get("/posts", isAdmin, (req, res) => {
  //  Edit Posts
  //  If have an error in the edit pages (loaded the errors messages)
  if (req.session.editPostError) {
    let arrayEditPostError = req.session.editPostError;
    req.session.editPostError = "";

    Post.find()
      .lean()
      .populate("category")
      .sort({ date: "desc" })
      .then((posts) => {
        console.log(posts);
        res.render("admin/posts", {
          post: posts,
          editPostErrorMessage: arrayEditPostError,
        });
      })
      .catch((error) => {
        console.log(
          "There was an error to try loaded the collections informations " +
            error
        );
      });
  }
  //  If have success in edit a post (loaded the success message)
  else if (req.session.postEditSuccess) {
    req.session.postEditSuccess = false;

    Post.find()
      .lean()
      .populate("category")
      .sort({ date: "desc" })
      .then((posts) => {
        console.log(posts);
        res.render("admin/posts", {
          post: posts,
          postEditSuccessMessage: true,
        });
      })
      .catch((error) => {
        console.log(
          "There was an error to try loaded the collections informations " +
            error
        );
      });
  }

  //  Delete Post
  else if (req.session.postDeleteMessage) {
    req.session.postDeleteMessage = "";
    Post.find()
      .lean()
      .populate("category")
      .sort({ date: "desc" })
      .then((posts) => {
        console.log(posts);
        res.render("admin/posts", {
          post: posts,
          postDeleteSuccess: true,
        });
      })
      .catch((error) => {
        console.log(
          "There was an error to try loaded the collections informations " +
            error
        );
      });
  }

  //  Just Loaded the Posts
  else {
    Post.find()
      .lean()
      .populate("category")
      .sort({ date: "desc" })
      .then((posts) => {
        console.log(posts);
        res.render("admin/posts", { post: posts });
      })
      .catch((error) => {
        console.log(
          "There was an error to try loaded the collections informations " +
            error
        );
      });
  }
});

router.get("/posts/add", isAdmin, (req, res) => {
  //  If Error in create a new post (loaded the errors message)
  if (req.session.postsError) {
    let arrayPostsError = req.session.postsError;
    req.session.postsError = "";
    Category.find()
      .lean()
      .then((categories) => {
        res.render("admin/addPosts", {
          categories: categories,
          postsErrorMessage: arrayPostsError,
        });
      });
  }

  //  If create new post have success (loaded the success message)
  else if (req.session.postsSuccess) {
    req.session.postsSuccess = false;
    Category.find()
      .lean()
      .then((categories) => {
        res.render("admin/addPosts", {
          categories: categories,
          postsSuccessMessage: true,
        });
      });
  }

  //  Just loaded the Add Posts page
  else {
    Category.find()
      .lean()
      .then((categories) => {
        res.render("admin/addPosts", { categories: categories });
      });
  }
});

router.get("/posts/edit/:id", isAdmin, (req, res) => {
  //  loaded the model referent the id params
  Post.findOne({ _id: req.params.id })
    .lean()
    .then((posts) => {
      Category.find()
        .lean()
        .then((categories) => {
          res.render("admin/editPosts", { category: categories, post: posts });
        })
        .catch((error) => {
          console.log(
            "There was an erro when try to loaded the Category collection " +
              error
          );
        });
    });
});

module.exports = router;

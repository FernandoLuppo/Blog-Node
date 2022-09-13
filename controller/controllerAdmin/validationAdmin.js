//  Load modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//  Collection
require("../../models/Category");
require("../../models/Post");
const Category = mongoose.model("categories");
const Post = mongoose.model("posts");

//  Page - Add Categories
router.post("/categories/new", (req, res) => {
  let name = req.body.name;
  let slug = req.body.slug;

  //  Validation
  const categoriesError = [];

  //  Name Validation
  if (name === "" || name === null || name === undefined) {
    categoriesError.push({
      categoriesErrorMessage: "Nome da Categoria não pode estar vazio",
    });
  }

  //  Slug Validation

  slug = slug.trim();

  if (slug === "" || slug === null || slug === undefined) {
    categoriesError.push({
      categoriesErrorMessage: "O tipo da categoria não pode estar vazio",
    });
  }

  //  If Error
  if (categoriesError.length > 0) {
    console.log(categoriesError);
    req.session.categoryError = categoriesError; // Colocar o nome da session o msm do array
    req.session.success = false;
    res.redirect("../../admin/categories/add");
  }

  //  If Success
  else {
    let newCategories = {
      name: name,
      slug: slug,
    };

    new Category(newCategories)
      .save()
      .then(() => {
        console.log("Category saved with successful");
        req.session.success = true;
        res.redirect("../../admin/categories/add");
      })
      .catch((error) => {
        console.log(
          "There was an error when try to save the category " + error
        );
        res.redirect("../../admin/categories/add");
      });
  }
});

//  Page - Edit Categories
router.post("/categories/edit", (req, res) => {
  let name = req.body.name;
  let slug = req.body.slug;

  //  Validation
  const editCategoriesError = [];

  //  Name Validation
  if (name === "" || name === null || name === undefined) {
    editCategoriesError.push({
      editCategoriesErrorMessage: "Nome da Categoria não pode estar vazio",
    });
  }

  //  Slug Validation
  slug = slug.trim();

  if (slug === "" || slug === null || slug === undefined) {
    editCategoriesError.push({
      editCategoriesErrorMessage: "O tipo da categoria não pode estar vazio",
    });
  }

  //  If Error
  if (editCategoriesError.length > 0) {
    console.log(editCategoriesError);
    req.session.editCategoryError = editCategoriesError;
    req.session.editSuccess = false;
    res.redirect("../../admin/categories");
  }

  //  If Success
  else {
    Category.findOne({ _id: req.body.id }).then((category) => {
      category.name = name;
      category.slug = slug;

      category
        .save()
        .then(() => {
          console.log("Category edited with success");
          req.session.editSuccess = true;
          res.redirect("../../admin/categories");
        })
        .catch((error) => {
          console.log(
            "There was an erro to try save the category edited " + error
          );
          res.redirect("../../admin/categories");
        });
    });
  }
});

//  Delete Category
router.post("/category/delete", (req, res) => {
  Category.deleteOne({ _id: req.body.id })
    .then(() => {
      req.session.deleteMessage = true;
      res.redirect("../../admin/categories");
    })
    .catch((error) => {
      console.log("There was an erro to try delete the category " + error);
      res.redirect("../../admin/categories");
    });
});

//  Page - Add Post
router.post("/posts/add", (req, res) => {
  let title = req.body.title;
  let slug = req.body.slug;
  let description = req.body.description;
  let content = req.body.content;
  let category = req.body.category;

  //  Validations
  let postsError = [];

  //  Title Validation
  if (title === "" || title === null || title === undefined) {
    postsError.push({ postsErrorMessage: "Título não pode estar vazio" });
  }

  //  Slug Validation
  slug = slug.trim();

  if (slug === "" || slug === null || slug === undefined) {
    postsError.push({ postsErrorMessage: "Slug não pode estar vazio" });
  }

  //  Description Validation
  if (description === "" || description === null || description === undefined) {
    postsError.push({ postsErrorMessage: "Descrição não pode estar vazio" });
  }

  //  Content Validation
  if (content === "" || content === null || content === undefined) {
    postsError.push({ postsErrorMessage: "Conteúdo não pode estar vazio" });
  }

  //  Category Validation
  if (category === "0") {
    postsError.push({
      postsErrorMessage: "Categoria inválida, registre uma categoria",
    });
  }

  //  If Error
  if (postsError.length > 0) {
    console.log(postsError);
    req.session.postsError = postsError;
    res.redirect("../../admin/posts/add");
  }

  //  If Success
  else {
    const newPost = {
      title: title,
      slug: slug,
      description: description,
      content: content,
      category: category,
    };

    new Post(newPost)
      .save()
      .then(() => {
        console.log("Post saved with successful");
        req.session.postsSuccess = true;
        res.redirect("../../admin/posts/add");
      })
      .catch((error) => {
        console.log("There was an error when try to save the post " + error);
        res.redirect("../../admin/posts/add");
      });
  }
});

//  Page - Edit Posts
router.post("/posts/edit", (req, res) => {
  let title = req.body.title;
  let slug = req.body.slug;
  let description = req.body.description;
  let content = req.body.content;
  let category = req.body.category;

  //  Validation
  let postEditError = [];

  //  Title Validation
  if (title === "" || title === null || title === undefined) {
    postEditError.push({ postEditErrorMessage: "Título não pode estar vazio" });
  }
  //  Slug Validation
  slug = slug.trim();

  if (slug === "" || slug === null || slug === undefined) {
    postEditError.push({ postEditErrorMessage: "Tema não pode estar vazio" });
  }

  //  Description Validation
  if (description === "" || description === null || description === undefined) {
    postEditError.push({
      postEditErrorMessage: "Descrição não pode estar vazio",
    });
  }

  //  Content Validation
  if (content === "" || content === null || content === undefined) {
    postEditError.push({
      postEditErrorMessage: "Conteúdo não pode estar vazio",
    });
  }

  //  Category Validation
  if (
    category === "" ||
    category === null ||
    category === undefined ||
    category == "0"
  ) {
    postEditError.push({ postEditErrorMessage: "Categoria inválida" });
  }

  //  If Error
  if (postEditError.length > 0) {
    console.log(postEditError);
    req.session.editPostError = postEditError;
    res.redirect("../../admin/posts");
  }

  //  If Success
  else {
    Post.findOne({ _id: req.body.id })
      .then((posts) => {
        posts.title = title;
        posts.slug = slug;
        posts.description = description;
        posts.content = content;
        posts.category = category;

        posts.save().then(() => {
          req.session.postEditSuccess = true;
          res.redirect("../../admin/posts");
        });
      })
      .catch((error) => {
        req.session.console.log(
          "There was an erro to try edit the post " + error
        );
        res.redirect("../../admin/posts");
      });
  }
});

//  Delete Post
router.post("/post/delete", (req, res) => {
  Post.deleteOne({ _id: req.body.id })
    .then(() => {
      req.session.postDeleteMessage = true;
      res.redirect("../../admin/posts");
    })
    .catch((error) => {
      console.log("There was an erro to try delete the post " + error);
      res.redirect("../../admin/posts");
    });
});

module.exports = router;

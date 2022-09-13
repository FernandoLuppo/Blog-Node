if (process.env.NODE_ENV == "production") {
  module.exports = {
    mongoURI:
      "mongodb+srv://fernando:40284600@blognode.qdn2kls.mongodb.net/test",
  };
} else {
  module.exports = { mongoURI: "mongodb://localhost/blogApp" };
}

const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/Post");

const app = express();

mongoose.connect("mongodb://localhost:27017/testeAula");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  Post.find((err, post) => {
    res.render("index", { post });
    res.end()
  });
});

app.get("/criar-post", (req, res) => {
  res.render("createPost");
});

app.post("/post-cadastrado", (req, res) => {
  const { title, resume, content } = req.body;

  const post = Post({
    title,
    resume,
    content,
  });

  post.save((err) =>
    err ? console.log(err) : console.log("Criado com sucesso!")
  );
});

app.listen(3333, () => console.log("Server is running in :3333 !!"));

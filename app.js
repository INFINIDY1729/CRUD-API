const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const user = require("./models/details");
const methodOverride = require("method-override");
const { findByIdAndUpdate } = require("./models/details");

mongoose
  .connect("mongodb://localhost:27017/user-details", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Data Base connected");
  })
  .catch((err) => {
    console.log("oh no Mongo ERROR", err);
  });

const app = express();

app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Working");
});

app.get("/userdetails", async (req, res) => {
  const users = await user.find({});
  res.render("index.ejs", { users });
});

app.get("/userdetails/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/userdetails", async (req, res) => {
  const detail = req.body;
  const newuser = new user(detail);
  await newuser.save();
  res.redirect(`/userdetails/${newuser._id}`);
});

app.get("/userdetails/:id", async (req, res) => {
  const { id } = req.params;
  const userdetail = await user.findById(id);
  res.render("show.ejs", { userdetail });
});

app.get("/userdetails/:id/edit", async (req, res) => {
  const { id } = req.params;
  const userdetail = await user.findById(id);
  res.render("edit.ejs", { userdetail });
});

app.put("/userdetails/:id", async (req, res) => {
  const { id } = req.params;
  const newdetail = await user.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/userdetails/${newdetail._id}`);
});

app.delete("/userdetails/:id", async (req, res) => {
  const { id } = req.params;
  await user.findByIdAndDelete(id);
  res.redirect("/userdetails");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started aat port 3000");
});

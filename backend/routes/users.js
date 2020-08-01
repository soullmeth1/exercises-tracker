const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error ", err));
});

router.post("/", (req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json("User Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => res.json("Sukses menghapus Data " + req.params.id))
    .catch((err) => res.status(400).json("Gagal menghapus data"));
});

router.put("/:id", (req, res) => {
  const newData = req.body;
  User.updateOne({ _id: req.params.id }, newData)
    .then(() =>
      res.json(
        "sukses mengubah data id " + req.params.id + JSON.stringify(newData)
      )
    )
    .catch((err) => res.status(400).json("Gagal mengubah data"));
});

module.exports = router;

const express = require("express");

const router = express.Router();

const Exercise = require("../models/exercise.model");

router.get("/", (req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error" + err));
});

router.get("/:id", (req, res) => {
  Exercise.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json("Tidak ada data"));
});

router.post("/", (req, res) => {
  const { username, description, duration, date } = req.body;

  const newExercise = new Exercise({
    username,
    description,
    duration: Number(duration),
    date: Date.parse(date),
  });
  newExercise
    .save()
    .then((hsl) => res.json("Sukses menambah data"))
    .catch((err) => res.status(400).json("Gagal menambah data"));
});

router.put("/:id", (req, res) => {
  const newVal = req.body;
  Exercise.updateOne({ _id: req.params.id }, newVal)
    .then((result) => res.json("sukses mengubah data"))
    .catch((err) => res.status(400).json("gagal mengubah data"));
});

router.delete("/:id", (req, res) => {
  Exercise.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) throw err;
    res.json("sukses menghapus data");
  });
});

module.exports = router;

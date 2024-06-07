const express = require("express");
const router = express.Router();
const connection = require("../db");
router.get("/getBrokenCars", (req, res) => {
  connection.query("select * from BrokenCars", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    console.log(results);
    res.json(Object.values(results) || []);
  });
});

module.exports = router;

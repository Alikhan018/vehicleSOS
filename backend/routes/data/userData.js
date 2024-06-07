const express = require("express");
const router = express.Router();
const connection = require("../db");
const { setUser } = require("../setUsersMiddleware");

router.use(setUser);

router.get("/userData", (req, res) => {
  connection.query(
    "SELECT * FROM USER WHERE USERNAME = ?",
    [req.body.user.username],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: String(error) });
      }
      const re = Object.values(result);
      res.json(re);
    }
  );
});

module.exports = router;

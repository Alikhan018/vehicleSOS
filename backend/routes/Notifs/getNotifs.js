const express = require("express");
const router = express.Router();
const connection = require("../db");
const { setUser } = require("../setUsersMiddleware");

router.use(setUser);

router.get("/fetchNotifs", (req, res) => {
  connection.query(
    "SELECT * FROM NOTIFS WHERE PHONENUM = ?",
    [req.body.user.phoneNum],
    (err, result) => {
      if (!err) {
        const arr = Object.values(result);
        return res.json(arr);
      }
      return res.json({ message: "No notifs" });
    }
  );
});

module.exports = router;

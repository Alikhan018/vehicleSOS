const express = require("express");
const router = express.Router();
const connection = require("../db");
const { setUser } = require("../setUsersMiddleware");

router.use(setUser);

router.post("/dismiss", (req, res) => {
  const { num } = req.body;
  console.log(num);
  connection.query(
    "DELETE FROM NOTIFS WHERE PHONENUM = ?",
    [req.body.user.phoneNum],
    (err, result) => {
      if (!err) {
        console.log("Deleted");
      }
      console.log(err);
    }
  );
});

module.exports = router;

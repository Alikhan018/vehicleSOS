const express = require("express");
const router = express.Router();
const connection = require("../db");
const { setUser } = require("../setUsersMiddleware");
router.use(setUser);

let n, i;
router.post("/startfetch", (req, res) => {
  const { num, id } = req.body;
  n = num;
  i = id;
});
router.get("/workshopmaprender", (req, res) => {
  connection.query(
    "SELECT * FROM BROKENCARS WHERE PHONENUM = ?",
    [n],
    (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(500).json({ message: "No Data Found" });
      }
      return res.json(result[0]);
    }
  );
});
router.post("/helpsent", (req, res) => {
  connection.query(
    "SELECT * FROM brokencars WHERE idbrokenCars = ?",
    [i],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(500).json({ message: "No Data Found" });
      }
      const otheruserNum = result[0].phoneNum;
      connection.query(
        "INSERT INTO notifs (workshopName, phoneNum, brokenid, workshopNum) VALUES (?, ?, ?, ?)",
        [req.body.user.workshopName, n, i, req.body.user.phoneNum],
        (err, result) => {
          console.log(err);
          if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
          }
          connection.query(
            "DELETE FROM BROKENCARS WHERE idbrokenCars = ?",
            [i],
            (err, result) => {
              if (err) {
                return res
                  .status(400)
                  .json({ message: "Internal Server Error" });
              }
              return res.json({ message: "Help Sent", otheruserNum });
            }
          );
        }
      );
    }
  );
});

module.exports = router;

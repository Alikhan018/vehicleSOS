const express = require("express");
const router = express.Router();
const connection = require("../db");
const { setUser } = require("../setUsersMiddleware");

router.use(setUser);

router.get("/sendLocation", (req, res) => {
  res.json({ message: "Hey" });
});
router.post("/sendLocation", (req, res) => {
  const { x, y, carname } = req.body;
  console.log(req.body.user);
  connection.query(
    "INSERT INTO BROKENCARS(longitude, latitude, ownerName, carname, phoneNum, latitudeDelta, longitudeDelta) VALUES (?,?,?,?,?,?,?)",
    [
      y,
      x,
      req.body.user.firstname,
      carname,
      req.body.user.phoneNum,
      0.0421,
      0.0922,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      console.log(result);
      if (result.length === 0) {
        return res.status(400).json({ message: "Invalid Address" });
      }
      res.json({ message: "Address Sent" });
    }
  );
});

module.exports = router;

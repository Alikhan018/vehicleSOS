const express = require("express");
const router = express.Router();
const connection = require("../db");
const { setUser } = require("../setUsersMiddleware");
router.use(setUser);

router.get("/getParts", (req, res) => {
  connection.query("SELECT * FROM CARPARTS", (err, result) => {
    if (!err) {
      return res.json(Object.values(result));
    } else {
      console.log(err);
      return res.json([{ message: "Err" }]);
    }
  });
});
router.get("/postedParts", (req, res) => {
  connection.query(
    "SELECT * FROM CARPARTS WHERE CONTACTNUM = ?",
    [req.body.user.phoneNum],
    (err, result) => {
      if (!err) {
        return res.json(Object.values(result));
      }
      console.log(err);
    }
  );
});
router.post("/postPart", (req, res) => {
  const { partName, price, qty } = req.body;
  connection.query(
    "INSERT INTO CARPARTS (PARTNAME,WORKSHOPNAME,OWNERNAME,PRICE,QUANTITY,CONTACTNUM) VALUES (?,?,?,?,?,?)",
    [
      partName,
      req.body.user.workshopName,
      req.body.user.ownerName,
      price,
      qty,
      req.body.user.phoneNum,
    ],
    (err, result) => {
      console.log(err);
      if (!err) {
        return res.json({ message: "Data posted!" });
      }
    }
  );
});

module.exports = router;

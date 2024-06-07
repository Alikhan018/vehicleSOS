const express = require("express");
const router = express.Router();
const connection = require("../db");
const { setUser } = require("../setUsersMiddleware");
router.use(setUser);

let partId, wn, wp;
router.post("/startpartsfetch", (req, res) => {
  const { id, phone, name } = req.body;
  partId = id;
  wn = name;
  wp = phone;
  res.send("Fetching...");
});

router.post("/placeOrder", (req, res) => {
  const { ad1, ad2 } = req.body;
  connection.query(
    "SELECT * FROM CARPARTS WHERE CONTACTNUM = ?",
    [wp],
    (err, result) => {
      if (!err) {
        let qty = result[0].quantity;
        if (qty <= 0) {
          connection.query(
            "DELETE FROM CARPARTS WHERE QUANTITY = ?",
            [qty],
            (err, res) => {
              console.log("Deleted empty item");
            }
          );
          return res.json({ message: "Out of order" });
        } else {
          connection.query(
            "INSERT INTO ORDERS (PARTID, PERSONNAME, PHONENUM, ADDRESSONE, ADDRESSTWO, WORKSHOPNAME, WORKSHOPPHONE) VALUES (?,?,?,?,?,?,?)",
            [
              partId,
              req.body.user.firstname,
              req.body.user.phoneNum,
              ad1,
              ad2,
              wn,
              wp,
            ],
            (err, results) => {
              if (!err) {
                connection.query(
                  "INSERT INTO ORDERNOTIFS (NAME, ADDRESSONE, ADDRESSTWO, PHONENUM, WORKSHOPNUM) VALUES (?,?,?,?,?)",
                  [
                    req.body.user.firstname,
                    ad1,
                    ad2,
                    req.body.user.phoneNum,
                    wp,
                  ],
                  (err, results) => {
                    if (!err) {
                      connection.query(
                        "UPDATE CARPARTS SET QUANTITY = QUANTITY - 1 WHERE CONTACTNUM = ?",
                        [wp],
                        (err, results) => {
                          if (!err) {
                            return res.json({ message: "Order Sent ON" });
                          }
                          return res.json({
                            message: "Server Err! ON",
                          });
                        }
                      );
                    }
                  }
                );
              }
              console.log(err);
            }
          );
        }
      }
    }
  );
});

router.get("/getOrders", (req, res) => {
  connection.query(
    "SELECT * FROM ORDERNOTIFS WHERE WORKSHOPNUM = ?",
    [req.body.user.phoneNum],
    (err, results) => {
      if (!err) {
        return res.json(results);
      }
    }
  );
});

module.exports = router;

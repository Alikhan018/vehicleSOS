const express = require("express");
const router = express.Router();
const connection = require("../db");
const { setUser } = require("../setUsersMiddleware");
router.use(setUser);

router.get("/workshopData", async (req, res) => {
  connection.query(
    "SELECT * FROM WUSER INNER JOIN workshop ON WUSER.email = workshop.email WHERE WUSER.email = ?;",
    [req.body.user.email],
    (error, result) => {
      if (error) {
        return res.json({ error: String(error) });
      }
      const arr = Object.values(result);
      console.log(arr);
      res.json(arr);
    }
  );
});
router.get("/viewWorkshops", (req, res) => {
  connection.query("SELECT * FROM WORKSHOP", (err, results) => {
    if (!err) {
      return res.json(Object.values(results));
    }
  });
});

module.exports = router;

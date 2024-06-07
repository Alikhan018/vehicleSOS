const express = require("express");
const router = express.Router();
const connection = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SIGNATURE_KEY = "secretkey";

router.get("/signupWuser", (req, res) => {
  res.send("lets sign up");
});
router.post("/signupWuser", async (req, res) => {
  const { ownerName, workshopName, location, email, password, phoneNum } =
    req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  connection.query(
    "INSERT INTO wuser(ownerName,workshopName,email,password, phoneNum) VALUES(?,?,?,?,?)",
    [ownerName, workshopName, email, encryptedPassword, phoneNum],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      connection.query(
        "INSERT INTO WORKSHOP (workshopname, owner, location, email, phoneNum) VALUES (?, ?, ?, ?, ?)",
        [workshopName, ownerName, location, email, phoneNum],
        async (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
          }
          if (result.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
          }
          const token = await jwt.sign({ email }, SIGNATURE_KEY);
          res.json({ message: "Signed Up", token });
        }
      );
    }
  );
});
router.get("/loginWorkshop", (req, res) => {
  res.send("Hello");
});
router.post("/loginWorkshop", (req, res) => {
  const { email, password } = req.body;
  connection.query(
    "SELECT * FROM wuser WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isValid = bcrypt.compare(password, results[0].password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid Password" });
      }
      const token = await jwt.sign({ email: results[0].email }, SIGNATURE_KEY);
      res.json({ message: "Logged In", token });
    }
  );
});

module.exports = router;

const express = require("express");
const router = express.Router();
const connection = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SIGNATURE_KEY = "secretkey";

router.get("/login", (req, res) => {
  res.send("bye");
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM user WHERE username = ?",
    [username],
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
      const token = await jwt.sign(
        { username: results[0].username },
        SIGNATURE_KEY
      );
      res.json({ message: "Logged In", token });
    }
  );
});
router.get("/signupUser", (req, res) => {
  res.send("lets sign up");
});
router.post("/signupUser", async (req, res) => {
  const { firstname, lastname, username, email, password, phoneNum } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  //password column ki type kia hai?
  connection.query(
    "INSERT INTO USER(firstname,lastname,username,email,password, phoneNum) VALUES(?,?,?,?,?,?)",
    [firstname, lastname, username, email, encryptedPassword, phoneNum],
    async (error, results) => {
      console.log(error);
      if (error) {
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = await jwt.sign({ username }, SIGNATURE_KEY);
      res.json({ message: "Signed Up", token });
    }
  );
});

module.exports = router;

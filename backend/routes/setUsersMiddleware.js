const connection = require("./db");
const SIGNATURE_KEY = "secretkey";
const jwt = require("jsonwebtoken");
const setUser = async (req, res, next) => {
  const token = req.headers.authorization || "";
  const username = await jwt.verify(token, SIGNATURE_KEY);
  console.log(username);
  if (!username) {
    return res
      .status(400)
      .json({ message: "Username not provided in request body" });
  }
  if (username.username !== undefined) {
    connection.query(
      "SELECT * FROM user WHERE USERNAME = ?",
      [username.username],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: err.toString() });
        }
        if (result.length === 0) {
          return res.status(404).json({ message: "No user found" });
        }
        const user = result[0];
        req.body.user = user;
        next();
      }
    );
  } else {
    connection.query(
      "SELECT * FROM wuser WHERE EMAIL = ?",
      [username.email],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: err.toString() });
        }
        if (result.length === 0) {
          return res.status(404).json({ message: "No user found" });
        }
        const user = result[0];
        req.body.user = user;
        next();
      }
    );
  }
};

module.exports = { setUser };

var express = require("express");
var router = express.Router();
// Set up Global configuration access
require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post("/user/generateToken", (req, res) => {
  const token = generateAccessToken();
  res.send(token);
});

router.get("/user/validateToken", (req, res) => {
  // Tokens are generally passed in the header of the request
  // Due to security reasons.

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send("Successfully Verified");
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
});

// Validate User Here
// Then generate JWT Token
function generateAccessToken() {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: 1,
  };

  return jwt.sign(data, jwtSecretKey, { expiresIn: "30m" });
}

module.exports = router;

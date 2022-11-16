const jwt = require("jsonwebtoken");

function validarToken(req, res, next) {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = req.header(tokenHeaderKey);

  if (token == null) res.status(400).send("Token not present");

  jwt.verify(token, jwtSecretKey, (err) => {
    if (!err) {
      console.log("Succesfully Verified");
      next(); //proceed to the next action in the calling function
    } else {
      res.status(401).send(err);
    }
  });
}

module.exports = validarToken;

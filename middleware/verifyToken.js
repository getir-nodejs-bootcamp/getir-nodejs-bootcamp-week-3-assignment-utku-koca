const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;

  !authHeader &&
    res
      .status(401)
      .json({ success: false, message: "You are not authenticated!" });
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_STRING, (err, user) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    req.user = user;
    next();
  });
}

module.exports = verify;

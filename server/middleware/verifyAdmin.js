const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).json({
      succes: false,
      message: "Please login first",
    });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET_OR_PRIVATE_KEY,
    function (err, data) {
      if (err) {
        return res.json({
          success: false,
          message: "Invalid Token",
          err,
        });
      }
      req.adminUserId = data.user;
      return next();
    }
  );
};

module.exports = { verifyAdmin };

require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretCode = process.env.SECRET_CODE;

// Middleware function to check if the user is authenticated
exports.authenticateUser = (req, res, next) => {
  // Check if the user is authenticated
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access. Token not provided." });
  }

  // Verify the JWT token
  jwt.verify(token, secretCode, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized access. Invalid token." });
    }
  //cha3lik fih mizal mch kamel just na3ml f implementation

    // Proceed to the next middleware or route handler
    next();
  });
};

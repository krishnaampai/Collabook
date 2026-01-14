const admin = require("firebase-admin");

const verifyAuth = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("No token provided");
  }

  const token = header.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // uid, email
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Invalid token");
  }
};

module.exports = verifyAuth;

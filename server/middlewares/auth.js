const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "No Token, Access Denied" });
    }
    if (!token.startsWith("Bearer ")) {
      return res.status(400).json({ error: "Invalid Token Format" });
    }
    token = token.split(" ")[1];

    const verified = jwt.verify(token, "passKey");

    if (!verified) {
      return res.status(401).json({ error: "Token Verification Failed, Access Denied" });
    }


    req.user = { id: verified.id };
    req.token = token;

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = auth;

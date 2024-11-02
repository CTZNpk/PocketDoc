const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("auth-token");

    if (!token) {
      return res.status(401).json({ error: "No Token, Access Denied" });
    }

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

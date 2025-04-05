const jwt = require("jsonwebtoken");
const setAuthCookies = require("../utils/setAuthCookies");
const { generateAccessToken } = require("../utils/generateTokens");

const auth = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (accessToken) {
    try {
      const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = verified;
      return next();
    } catch (err) {
      if (err.name !== "TokenExpiredError") {
        return res.status(401).json({ error: "Invalid access token" });
      }
    }
  }

  if (refreshToken) {
    try {
      const verified = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );

      const newAccessToken = generateAccessToken(verified);

      setAuthCookies(res, newAccessToken, refreshToken);

      req.user = verified;
      return next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
  }

  return res.status(401).json({ error: "Not authenticated" });
};

module.exports = auth;

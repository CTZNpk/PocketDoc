const jwt = require("jsonwebtoken");
const setAuthCookies = require("../utils/setAuthCookies");

const auth = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (accessToken) {
    try {
      const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = { id: verified.id, email: verified.email };
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
      const user = { id: verified.id, email: verified.email };

      const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
      const newRefreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" },
      );

      setAuthCookies(res, newAccessToken, newRefreshToken);

      req.user = user;
      return next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
  }

  return res.status(401).json({ error: "Not authenticated" });
};

module.exports = auth;

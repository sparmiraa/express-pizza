import { env } from "../config/env.config.js";
import jwt from "jsonwebtoken";

class TokenService {
  generateAccessToken(payload) {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: "5m",
    });
  }

  generateRefreshToken(payload) {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
  }
}

export default new TokenService();

import authService from "../services/authService.js";
import tokenService from "../services/tokenService.js";
import { env } from "../config/env.config.js";
import ApiError from "../exceptions/apiError.js";
import userService from "../services/userService.js";

class AuthController {
  async registration(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;

      const data = await authService.registration({
        firstName,
        lastName,
        email,
        password,
      });

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: Number(env.TIME_TO_LIVE_REFRESH_TOKEN),
      });

      return res.json({
        accessToken: data.accessToken,
      });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const data = await authService.login(email, password);

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: Number(env.TIME_TO_LIVE_REFRESH_TOKEN),
      });

      return res.json({
        accessToken: data.accessToken,
      });
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.Unauthorized();
      }

      const data = await authService.refresh(refreshToken)

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: env.TIME_TO_LIVE_REFRESH_TOKEN,
      });

      return res.json({ accessToken: data.accessToken });
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();

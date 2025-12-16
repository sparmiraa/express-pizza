import authService from "../services/authService.js";

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
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        accessToken: data.accessToken,
        user: data.user,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();

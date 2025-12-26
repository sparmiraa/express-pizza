import userService from "../services/userService.js";

class UserController {
  async getMe(req, res, next) {
    try {
      const { userId } = req.user;

      const userDto = await userService.getUserProfile(userId);

      return res.json(userDto);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();

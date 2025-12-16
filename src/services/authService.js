import userService from "./userService.js";
import tokenService from "./tokenService.js";

class AuthService {
  async registration(dto) {
    const userData = await userService.createUser(dto);

    const accessToken = tokenService.generateAccessToken({
      userId: userData.userId,
      roles: userData.roles,
    });

    const refreshToken = tokenService.generateRefreshToken({
      userId: userData.userId,
      roles: userData.roles,
    });

    return {
      accessToken,
      refreshToken,
      user: userData,
    };
  }
}

export default new AuthService();

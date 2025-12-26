import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import { Role } from "../models/index.js";
import userService from "./userService.js";
import tokenService from "./tokenService.js";
import { normalizeEmail } from "../utils/normalizeEmail.js";
import ApiError from "../exceptions/apiError.js";

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
    };
  }

  async login(email, password) {
    const normalizedEmail = normalizeEmail(email);

    const user = await User.findOne({
      where: { email: normalizedEmail },
      attributes: ["id", "email", "password"],
      include: {
        model: Role,
        attributes: ["name"],
      },
    });

    if (!user) {
      throw ApiError.Unauthorized("Неверный email или пароль");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw ApiError.Unauthorized("Неверный email или пароль");
    }

    const roles = user.Roles.map((role) => role.name);

    const accessToken = tokenService.generateAccessToken({
      userId: user.id,
      roles: roles,
    });

    const refreshToken = tokenService.generateRefreshToken({
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken) {
    const tokenData = tokenService.extractUserIdFromRefresh(refreshToken);
    if (!tokenData) {
      throw ApiError.Unauthorized();
    }

    const user = await userService.getUserById(tokenData.userId);

    const roles = user.Roles.map((role) => role.name);

    const newAccessToken = tokenService.generateAccessToken({
      userId: user.id,
      roles,
    });

    const newRefreshToken = tokenService.generateRefreshToken({
      userId: user.id,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}

export default new AuthService();

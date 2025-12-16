import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { Role } from "../models/Role.js";
import Roles from "../constants/roles.js";
import ApiError from "../exceptions/apiError.js";

const SALT_ROUNDS = 10;

class UserService {
  normalizeEmail(email) {
    return email.trim().toLowerCase();
  }

  async hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async createUser({ firstName, lastName, email, password }) {
    const normalizedEmail = this.normalizeEmail(email);

    const existingUser = await User.findOne({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw ApiError.BadRequest(
        "Пользователь с такой электронной почтой уже существует"
      );
    }

    const hashedPassword = await this.hashPassword(password);

    const createdUser = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const userRole = await Role.findOne({
      where: { name: Roles.USER },
    });

    await createdUser.addRole(userRole);

    return {
      userId: createdUser.id,
      roles: [Roles.USER],
    };
  }
}

export default new UserService();

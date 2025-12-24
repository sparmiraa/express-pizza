import { hashPassword } from "../crypto/index.js";
import { normalizeEmail } from "../utils/normalizeEmail.js";
import { User } from "../models/index.js";
import { Role } from "../models/index.js";
import Roles from "../constants/roles.js";
import ApiError from "../exceptions/apiError.js";


class UserService {
  async createUser({ firstName, lastName, email, password }) {
    const normalizedEmail = normalizeEmail(email);
    const existingUser = await User.findOne({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw ApiError.BadRequest(
        "Пользователь с такой электронной почтой уже существует"
      );
    }

    const hashedPassword = await hashPassword(password);

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

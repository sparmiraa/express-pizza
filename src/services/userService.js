import { hashPassword } from "../crypto/index.js";
import { normalizeEmail } from "../utils/normalizeEmail.js";
import { User } from "../models/index.js";
import { Role } from "../models/index.js";
import Roles from "../constants/roles.js";
import ApiError from "../exceptions/apiError.js";
import { sequelize } from "../sequelize/sequelize.js";
import { toUserProfileDto } from "../mapper/user-mapper.js";

class UserService {
  async createUser({ firstName, lastName, email, password }) {
    return await sequelize.transaction(async (t) => {
      const normalizedEmail = normalizeEmail(email);

      const existingUser = await User.findOne({
        where: { email: normalizedEmail },
        transaction: t,
      });

      if (existingUser) {
        throw ApiError.BadRequest(
          "Пользователь с такой электронной почтой уже существует"
        );
      }

      const hashedPassword = await hashPassword(password);

      const createdUser = await User.create(
        {
          firstName,
          lastName,
          email: normalizedEmail,
          password: hashedPassword,
        },
        { transaction: t }
      );

      const userRole = await Role.findOne({
        where: { name: Roles.USER },
        transaction: t,
      });

      await createdUser.addRole(userRole, { transaction: t });

      return {
        userId: createdUser.id,
        roles: [Roles.USER],
      };
    });
  }

  async getUserById(userId) {
    const user = await User.findByPk(userId, {
      include: Role,
    });

    if (!user) {
      throw ApiError.Unauthorized();
    }

    return user;
  }

  async getUserProfile(userId) {
    const user = await User.findOne({
      where: { id: userId },
      attributes: ["id", "firstName", "lastName", "email"],
      include: {
        model: Role,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    if (!user) {
      throw ApiError.NotFound("Пользователь не найден");
    }

    return toUserProfileDto(user);
  }

  async updateUser(userId, body) {
    const user = await User.findByPk(userId, {
      include: Role,
    });

    if (!user) {
      throw ApiError.NotFound("Пользователь не найден");
    }

    await user.update({
      firstName: body.firstName,
      lastName: body.lastName,
    });

    return toUserProfileDto(user);
  }

  async deleteUser(userId) {
    const deletedCount = await User.destroy({
      where: { id: userId },
    });

    if (deletedCount === 0) {
      throw ApiError.NotFound("Пользователь не найден");
    }
  }
}

export default new UserService();

import { sequelize } from "../sequelize/sequelize.js";

export const UserRole = sequelize.define(
  "UserRole",
  {},

  {
    tableName: "user_roles",
    timestamps: false,
  }
);

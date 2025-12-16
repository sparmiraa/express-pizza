import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize/sequelize.js";

export const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      unique: true,
    },

    description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);

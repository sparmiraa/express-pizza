import { Role } from "./Role.js";
import { User } from "./User.js";
import { UserRole } from "./UserRole.js";

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "userId",
  otherKey: "roleId",
  onDelete: "CASCADE",
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "roleId",
  otherKey: "userId",
  onDelete: "CASCADE",
});

export { User, Role, UserRole };

import { Role } from "./Role.js";
import { User } from "./User.js";
import { UserRole } from "./UserRole.js";

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "userId",
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "roleId",
});

export { User, Role, UserRole };

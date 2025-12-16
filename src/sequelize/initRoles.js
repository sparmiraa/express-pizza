import { Role } from "../models/Role.js";
import Roles from "../constants/roles.js";

export const initRoles = async () => {
  await Role.findOrCreate({
    where: { name: Roles.USER },
    defaults: {
      description: "Обычный пользователь",
    },
  });

  await Role.findOrCreate({
    where: { name: Roles.ADMIN },
    defaults: {
      description: "Администратор",
    },
  });
};

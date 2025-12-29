import { sequelize } from "./sequelize.js";
import { initRoles } from "./initRoles.js";
import { initAdmin } from "./initAdmin.js";
import "../models/index.js";

export const connectDatabase = async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: false });
      await initRoles();
      await initAdmin();
      console.log("Database initialized");
    } catch (err) {
      console.error("Failed to initialize DB:", err);
      throw err;
    }
  };
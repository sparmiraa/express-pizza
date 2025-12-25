import { env } from "./src/config/env.config.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./src/router/index.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import { sequelize } from "./src/sequelize/sequelize.js";
import { initRoles } from "./src/sequelize/initRoles.js";
import './src/models/index.js';

const PORT = env.PORT || 5000;

const app = express();

app.use(express.json());   
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: env.CLIENT_URL,
  })
);
app.use("/api", router);
app.use(errorMiddleware);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    await initRoles();

    console.log("DB initialized");

    app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(e)
  }
})();
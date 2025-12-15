import "./src/config/env.config.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./src/router/index.js";
import errorMiddleware from "./src/middleware/error-middleware.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", router);
app.use(errorMiddleware);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);

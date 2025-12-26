import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import userController from "../controller/userController.js";

const router = new Router();

router.get("/me", authMiddleware, userController.getMe);

export default router;

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import userController from "../controller/userController.js";
import { validateMiddleware } from "../middleware/validateMiddleware.js";
import { updateUserSchema } from "../schemas/userSchemas.js";

const router = new Router();

router.get("/me", authMiddleware, userController.getMe);
router.put("/", authMiddleware, validateMiddleware(updateUserSchema), userController.updateUser)

export default router;

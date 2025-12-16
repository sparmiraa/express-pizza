import { Router } from "express";
import authController from "../controller/authController.js";
import { validateMiddleware } from "../middleware/validateMiddleware.js";
import { registrationSchema } from "../schemas/authSchemas.js";

const router = new Router();

router.post("/registration",validateMiddleware(registrationSchema), authController.registration);

export default router;

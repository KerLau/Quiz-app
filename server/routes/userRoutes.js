import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/login", userController.loginHandler);
router.post("/signup", userController.signupHandler);
router.get("/");
router.post("/logout", authMiddleware, userController.logoutHandler);

export default router;

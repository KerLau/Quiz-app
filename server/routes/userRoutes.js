import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();
import { body, validationResult } from "express-validator";

router.post("/login", userController.loginHandler);
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required").trim(),
    body("email", "Email is required").isEmail().normalizeEmail(),
    body(
      "password",
      "Password is required and minimum length 4 character!"
    ).isLength({ min: 4 }),
  ],
  userController.signupHandler
);
router.get("/");
router.get("/categories", userController.getCategories);
router.post("/logout", authMiddleware, userController.logoutHandler);

export default router;

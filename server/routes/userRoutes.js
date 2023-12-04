import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

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

export default router;

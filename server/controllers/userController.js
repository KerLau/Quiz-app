// Handles user related requests like sign up login log out etc
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import Category from "../models/categoryModel.js";

// Signup
const signupHandler = async (req, res, next) => {
  console.log(req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array().map((err) => err.msg) });
    }

    const { name, email, password } = req.body;
    const alreadyRegistered = await User.findOne({ email });
    if (alreadyRegistered) {
      const error = new Error("This email is already registered");
      error.statusCode = 409;
      throw error;
    }
    // Check if all fields are filled
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all fields required" });
    }
    const saltRound = 10;
    const user = new User({
      name,
      email,
      password,
    });
    // Use the instance method to hash the password
    user.password = await user.hashPassword(password, saltRound);
    // Save the new user
    const result = await user.save();

    if (result) {
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Login
const loginHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if all fields are filled
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all fields required" });
    }
    // Check if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Correct password
    const payload = { email: user.email, userId: user._id };
    // Generate token
    const token = user.generateToken(payload, process.env.SECRET_KEY);
    // Send token and user data in the response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default { loginHandler, signupHandler };

// Handles user related requests like sign up login log out etc
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Signup

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  // Check if all fields are filled
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields required" });
  }
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  // Hash the password
  const saltRound = 10;
  const user = new User({
    name,
    email,
    password: "",
  });
  user.password = await user.hashPassword(password, saltRound);
  const result = await user.save();
  if (result) {
    res.status(201).json({ message: "User created successfully" });
  }
};

// Login
const login = async (req, res, next) => {
  const { email, password } = req.body;
  // Check if all fields are filled
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields required" });
  }
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }
  // Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  // Generate token
  const token = jwt.sign({ email: user.email, id: user._id }, "test", {
    expiresIn: "1h",
  });
  // Send token to client
  res.status(200).json({ result: user, token });
};

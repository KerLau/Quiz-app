// Update the logic for the userModel for sign up, login, logout

import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The first name is required"],
      minLength: 2,
      maxLength: 32,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      minLength: 4,
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 4,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    answer: {
      type: Array,
      default: 0,
    },
  },
  { timestamps: true }
);
// userSchema.post("save", function (doc, next) {
//   doc.correctAnswers = {};
//   next();
// });

userSchema.pre("save", function (next) {
  this.name =
    this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
  this.email = this.email.toLowerCase();
  next();
});

userSchema.methods.generateToken = function (payload, secret) {
  const token = jwt.sign(payload, secret, { expiresIn: 3600 });
  return token;
};

userSchema.methods.hashPassword = async function (password, saltRound) {
  const hash = await bcrypt.hash(password, saltRound);
  return hash;
};

const User = mongoose.model("User", userSchema);

export default User;

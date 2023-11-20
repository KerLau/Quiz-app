// Update the logic for the userModel for sign up, login, logout

import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

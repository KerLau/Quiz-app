// Handles user related requests like sign up login log out etc
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Signup

const signupHandler = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    // Check if all fields are filled
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all fields required" });
    }
    // Check if user already exists
    // const existingUser = await User.findOne({ email: email });
    // if (existingUser) {
    //   return res
    //     .status(409)
    //     .json({ message: "User already exists with this email" });
    // }
    // Hash the password
    const saltRound = 10;
    const user = new User({
      name,
      email,
      password: "",
    });
    // Use the instance method to hash the password
    user.password = await user.hashPassword(password, saltRound);
    // Save the new user
    const result = await user.save();

    if (result) {
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email is already in use" });
    }
    console.error("Error in signupHandler:", error);
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

// Logout

// const logoutHandler = async (req, res, next) => {
//   try {
//     // Make API call to logout endpoint
//     const response = await fetch("/logout", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${yourToken}`, // Include the user's token
//         "Content-Type": "application/json",
//       },
//     });
//     if (response.ok) {
//       // Clear the token from local storage or cookies
//       localStorage.removeItem("token"); // Change this based on your storage method

//       // Additional logic, e.g., redirect to login page or update UI
//     } else {
//       // Handle error
//       console.error("Logout failed");
//     }
//   } catch (error) {
//     console.error("Error during logout:", error);
//     return res.status(500).json({message: 'Internal Server Error'})
//   }
// };

// Logout handler
const logoutHandler = async (req, res, next) => {
  try {
    const token = req.yourToken; // Make sure to use the correct variable name
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Missing token" });
    }

    // Perform any additional token validation or cleanup logic here if needed

    // Assuming success, you can simply send a response indicating successful logout
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default { loginHandler, signupHandler, logoutHandler };

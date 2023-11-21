// Generating token with jwt
import jwt from "jsonwebtoken";

export const generateToken = (payload, secret) => {
  return jwt.sign(payload, secret, { expiresIn: 3600 });
};

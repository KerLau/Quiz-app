// Middleware to authenticate and authorize users.
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    const payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log(payload);

    req.userId = payload.userId;
    req.yourToken = token;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;

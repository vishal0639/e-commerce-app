import JWT from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

//protected routes token based
export const requiresSignIn = async (req, res, next) => {
  try {
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (user.role !== 1) {
      return res.send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};

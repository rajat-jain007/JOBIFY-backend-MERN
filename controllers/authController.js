import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

// Register
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0; // countDocuments is a method in mongodb
  req.body.role = isFirstAccount ? "admin" : "user"; // .role is coming from UserModel.js component

  // Hashing the password using bcryptjs
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt); // accessing password from UserModel.js
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User Created" });
};

//Login

export const login = async (req, res) => {
  res.send("login");
};

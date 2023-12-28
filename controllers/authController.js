import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

// Register
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0; // countDocuments is a method in mongodb
  req.body.role = isFirstAccount ? "admin" : "user"; // .role is coming from UserModel.js component

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

//Login

export const login = async (req, res) => {
  res.send("login");
};

import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

// Register
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0; // countDocuments is a method in mongodb
  req.body.role = isFirstAccount ? "admin" : "user"; // .role is coming from UserModel.js component

  // Hashing the password using bcryptjs

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User Created" });
};

//Login

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) throw new UnauthenticatedError("Invalid Credentials");
  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) throw new UnauthenticatedError("Wrong Password");
  res.send("login");
};

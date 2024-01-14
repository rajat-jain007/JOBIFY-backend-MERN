import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";
import { ieNoOpen } from "helmet";

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
  // finding existing user in database
  const user = await User.findOne({ email: req.body.email });

  // if invalid username
  if (!user) throw new UnauthenticatedError("Invalid Credentials");
  // checking password and comparing with hash value created in the server
  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );

  // password validation
  if (!isPasswordCorrect) throw new UnauthenticatedError("Wrong Password");

  // Jwt token created and sending encrypted info to the server
  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, { // cookie is a method
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    // while developing its in http and in production its going to be in https means secure property will be true
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "user logged in " });
};

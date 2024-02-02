import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }); // mongoDb by default creates (underscoreId)"_id"

  //coming from UserSchema
  const userWithoutPassword = user.toJSON();
  // getting back the user without getting back the password
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

// this is for admin route
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body }; // this obj is used, so that the user won't be able to update password using this controller
  delete obj.password;
  console.log(obj);

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: "Update User" });
};

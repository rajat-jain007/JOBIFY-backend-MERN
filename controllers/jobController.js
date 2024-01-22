import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";

// GET ALL JOBS

export const getAllJobs = async (req, res) => {
  // when the user make request with a cookie with a token, we only provide jobs that belong to specific user.
  const jobs = await Job.find({ createdBy: req.user.userId });
  // instead of writing status(200) code replacing it with StatusCodes.OK (OK means status(200)) library. Check Docs in status code npm js
  res.status(StatusCodes.OK).json({ jobs });
};

// CREATE JOB
export const createJob = async (req, res) => {
  // the createdBy from jobModel referred here.
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  // instead of writing status(200) code replacing it with StatusCodes.CREATED (CREATED means status(201)) library. Check Docs in npm js
  res.status(StatusCodes.CREATED).json({ job });
};

//  GET/FIND JOB

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  // res or response is the last return to be made. You don't need return keyword for that. if you have multiple return
  res.status(StatusCodes.OK).json({ job });
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  // Note: req.body is an object
  const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // set {new:true} otherwise in api by default it will send old data but database will be updated.

  return res
    .status(StatusCodes.OK)
    .json({ msg: `job modified`, job: updateJob });
};

// DELETE JOB

export const deleteJob = async (req, res) => {
  const deletedJob = await Job.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ msg: "Job Deleted", job: deletedJob });
};

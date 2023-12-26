import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import Job from "../models/JobModel.js";
import mongoose from "mongoose";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);

export const validateIdParam = withValidationErrors([
  // custom keyword coming from express-validator library
  param("id").custom(async (value) => {
    // Here "id" is in the value parameter
    const isValidId = mongoose.Types.ObjectId.isValid(value); // isValid is a option
    if (!isValidId) throw new BadRequestError("Invalid MongoDB id"); // --> we are returning message here in double quote "", in this condition. Since async function don't return false or truthy value.

    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value}`);
  }),
]);

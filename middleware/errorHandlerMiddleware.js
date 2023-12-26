import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  // When i was setting up the customErrors.js component, i gave the property name as statusCode not library name StatusCodes
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "something went wrong, try again later";
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;

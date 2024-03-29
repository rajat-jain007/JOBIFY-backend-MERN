// Put this package on top
import "express-async-errors";

// may create problem so put dotenv on top of all

import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

// routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
// try {
//   const response = await fetch(
//     "https://www.course-api.com/react-useReducer-cart-project"
//   );
//   const cartData = await response.json();
//   console.log(cartData);
// } catch (error) {
//   console.log(error);
// }

if (process.env.NODE_ENV === "development") {
  // Use of morgan Middleware is to log the info about our request to server(very useful)
  app.use(morgan("dev"));
}

app.use(cookieParser());
// Express.json meaning its a built in Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// authenticateUser protects/checks before accessing jobRouter(all jobs).
app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.use("/api/v1/users", authenticateUser, userRouter);

app.use("/api/v1/auth", authRouter);

// Custom middleware used for Not found page

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// Error route middleware

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server running on PORT ${port}...`);
  });
} catch (error) {
  console.log("MONGO db Connection Failed", error);
  process.exit(1);
}

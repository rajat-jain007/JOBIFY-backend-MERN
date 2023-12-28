// Put this package on top
import "express-async-errors";

// may create problem so put dotenv on top of all

import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();

// routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";


// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

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

// Express.json meaning its a built in Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});



app.use("/api/v1/jobs", jobRouter);

app.use('/api/v1/auth', authRouter)

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

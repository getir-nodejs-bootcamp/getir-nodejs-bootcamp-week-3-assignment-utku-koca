require("dotenv").config();
const express = require("express");
const logger = require("./middleware/logger");
const notFound = require("./middleware/not-found");
const userRouter = require("./routes/user");
const app = express();
const port = 5000;

// middlewares

app.use(express.json()); // added in order to take req.body

app.use(logger); // Everytime request is come , it is saved with logger

app.get("/", (req, res) => {
  res.status(200).json("Welcome to Api");
});

app.use("/api/v1/", userRouter); // handle user Routes

app.use(notFound); // handles url's are not exist

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

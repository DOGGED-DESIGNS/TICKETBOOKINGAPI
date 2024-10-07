const express = require("express");
const sequelize = require("./src/config/database");

require("express-async-errors");
const Env = require("dotenv");
const bodyparser = require("body-parser");
const connectDB = require("./db/connect");
const morgan = require("morgan");
const ticketRouter = require("./routes/routes");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

Env.config({ path: `${__dirname}/config.env` });
const port = process.env.PORT || 3000;

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
console.log("env:", process.env.NODE_ENV);
app.use("/api", ticketRouter);

//error handleing and not-found middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// setup
const start = async () => {
  try {
    sequelize.sync();
    app.listen(port);
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = app;

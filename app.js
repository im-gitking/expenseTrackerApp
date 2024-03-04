// Imports on Node
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const env = require("dotenv").config();
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
// const morgan = require("morgan");
const mongoose = require("mongoose");

// Routes require
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

// Using packages to read Requests
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());

// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// app.use(morgan("combined", { stream: accessLogStream }));

// Routes
app.use("/user", signupRoutes);
app.use("/user", loginRoutes);
app.use("/expenses", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premiumFeatures", leaderboardRoutes);
app.use("/password", passwordRoutes);

app.use(function (req, res, next) {
  res.removeHeader("Content-Security-Policy");
  next();
});

app.use((req, res) => {
  console.log(req.url);
  console.log(`Req recieved`);
  res.sendFile(path.join(__dirname, `frontend/${req.url}`));
});

// DB & server start
mongoose
  .connect(process.env.MONGODB_STRING)
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => console.error(err));

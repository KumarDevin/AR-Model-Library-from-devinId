require("dotenv").config();

const express = require("express");
const app = express();

const path = require("path");
const bodyParser= require('body-parser');
const cookieParser = require("cookie-parser");

const accessRouter = require("./routes/access")
const arRouter = require("./routes/ar");
const adminRouter = require("./routes/admin")
const { connectMongodb } = require("./connection");

//connect mongodb
connectMongodb(process.env.DB_CONNECTION);

// Server side render with EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middleware
app.use(express.static("./uploads")); // to serve static files
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser());


// Routers
app.use("/", adminRouter);
app.use("/api/ar", arRouter);
app.use("/access", accessRouter);


app.listen(process.env.PORT, () => {
  console.log(`server started with port ${process.env.PORT}`);
});

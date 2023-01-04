const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const AuthRoute = require("./routes/AuthRoute");
const userRoute = require("./routes/UserRoute");
const PostRoute = require("./routes/PostRoute");

const app = express();
// app.use(express.json());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/auth", AuthRoute);
app.use("/api/user", userRoute);
app.use("/api/post", PostRoute);

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => app.listen(process.env.PORT))
    .then(() => console.log(`Listening on port ${process.env.PORT}...`))
    .catch((err) => console.log(err));

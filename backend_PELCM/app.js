const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoute = require("./routes/user-routes");
const app = express();

app.use(express.json());

app.use("/api/user", userRoute);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(9000)).then(() => console.log("Listening on port 9000...")).catch((err) => console.log(err))


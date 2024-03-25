const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const router = require("./routes/router");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use("/", router);

const PORT = process.env.PORT || 8181;
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
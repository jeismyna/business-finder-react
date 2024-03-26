const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const db = require("./db");
const router = require("./routes/router");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Business Finder")
});

app.use("/api", router);

export const handler = serverless(app);
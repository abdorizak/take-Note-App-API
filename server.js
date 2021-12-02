/*
 * Copyright (c) 2021
 * @ author: Abdorizak Abdalla aka (Xman)
*/
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const note = require("./route/note");

app.use(express.json());

mongoose
  .connect("mongodb://localhost/notedb")
  .then(() => {
    console.log("connected To the DataBase...");
  })
  .catch((err) => {
    console.error("Not Connected To MongoDataBase...", err);
  });

app.use("/api/note", note);

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`running port ${port}`);
});

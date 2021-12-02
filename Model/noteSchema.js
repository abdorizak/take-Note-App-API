/*
 * Copyright (c) 2021
 * @ author: Abdorizak Abdalla aka (Xman)
 */
const mongoose = require("mongoose");
const Joi = require("joi");

const note = new mongoose.Schema({
  title: String,
  date: String,
  note: String,
});

function validation(note) {
  const noteValidate = Joi.object({
    title: Joi.string.required(),
    date: Joi.string.required(),
    note: Joi.string.required(),
  });
  return noteValidate.validate(note);
}

const DataModel = mongoose.model("DataModel", note);

module.exports = DataModel;
module.validation = validation;

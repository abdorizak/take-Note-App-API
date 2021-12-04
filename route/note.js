/*
 * Copyright (c) 2021
 * @ author: Abdorizak Abdalla aka (Xman)
 */
const mongoose = require("mongoose");
const express = require("express");
const route = express.Router();
const DataModel = require("../Model/noteSchema");

// Get ALl Note
route.get("/", async (req, res) => {
  try {
    const note = await DataModel.find();
    res.json({
      status: 200,
      message: "Sucess",
      data: note,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

// Create Note
route.post("/", async (req, res) => {
  try {
    const note = new DataModel(req.body);
    const result = await note.save();
    res.json({
      success: true,
      message: "Successfull Saved!",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Error: ${error}`,
    });
  }
});

// Update Note
route.put("/:id", async (req, res) => {
  try {
    const updateNote = await DataModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.json({
      status: 200,
      message: "Updated",
      data: updateNote,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Error: ${error}`,
    });
  }
});

// Delete Note
route.delete("/:id", async (req, res) => {
  try {
    const deleteNote = await DataModel.findByIdAndDelete(req.params.id);
    res.json({
      status: 200,
      message: `Note Deleted: ${deleteNote.title}`,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Error: ${error}`,
    });
  }
});

module.exports = route;

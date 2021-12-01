const mongoose = require("mongoose");
const express = require("express");
const route = express.Router();
const DataModel = require("../Model/noteSchema");

// Get ALl Note
route.get("/", async (req, res) => {
  try {
    res.send(await DataModel.find());
  } catch (error) {
    res.status(400).send(`Error`);
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
    });
  } catch (error) {
    res.send(`Error: ${error}`);
    res.json({
      success: true,
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
    res.send(updateNote);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});

// Delete Note
route.delete("/:id", async (req, res) => {
  try {
    const deleteNote = await DataModel.findByIdAndDelete(req.params.id);
    res.send({ success: true, message: `Note Deleted: ${deleteNote.title}` });
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});

module.exports = route;

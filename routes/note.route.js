const express = require("express");
const { NoteModel } = require("../model/note.model");

const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find();
    res.send(notes);
  } catch (error) {
    res.send("somthing wents wrong");
    console.log(error);
  }
});

noteRouter.post("/addnote", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.send("note added");
  } catch (error) {
    console.log(error);
    res.send("somthing went wrong");
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const note = await NoteModel.findOne({ _id: id });
  const note_user_id = note.userID;
  const userId = req.body.userID;
  try {
    if (note_user_id != userId) {
      res.send("your are not authorized");
    } else {
      await NoteModel.findByIdAndUpdate({ _id: id }, data);
      res.send("note updated");
    }
  } catch (error) {
    console.log(error);
    res.send("somthing went wrong");
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const note = await NoteModel.findOne({ _id: id });
  const note_user_id = note.userID;
  const userId = req.body.userID;
  try {
    if (note_user_id != userId) {
      res.send("your are not authorized");
    } else {
      await NoteModel.findByIdAndDelete({ _id: id });
      res.send("note Deleted");
    }
  } catch (error) {
    console.log(error);
    res.send("somthing went wrong");
  }
});

module.exports = {
  noteRouter,
};

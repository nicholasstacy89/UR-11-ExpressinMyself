const notes = require("express").Router();
const uuid = require("../helpers/uuid.js");
const { readAndAppend, readFromFile } = require("../helpers/fsUtility.js");

notes.get("/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/notes", (req, res) => {
  console.info(`${req.method} request received to notes`);
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting note");
  }
});

module.exports = notes;
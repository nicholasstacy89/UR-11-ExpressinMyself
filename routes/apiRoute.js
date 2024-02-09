const { randomUUID } = require("crypto");
const noteContent = require("../db/noteContent")

const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(noteContent);
    });
    app.post("/api/notes", function(req, res) {
        
        let newNote = req.body;
        let lastId = noteContent[noteContent.length - 1]["id"];
        let newId = randomUUID;
        newNote["id"] = newId;
        
        console.log("Req.body:", req.body);
        noteContent.push(newNote);

        writeFileAsync("./db/noteContent.json", JSON.stringify(noteContent)).then(function() {
            console.log("Notes has been updated.");
        });

        res.json(newNote);
    });

    app.delete("/api/notes/:id", function(req, res) {

        console.log("Req.params:", req.params);
        let noteId = parseInt(req.params.id);
        console.log(noteId);


        for (let i = 0; i < noteContent.length; i++) {
            if (noteId === noteContent[i].id) {
                noteContent.splice(i,1);
                
                let noteJSON = JSON.stringify(noteContent, null, 2)
                writeFileAsync("./db/noteContent.json", noteJSON).then(function() {
                console.log ("Note has been removed.");
            });                 
            }
        }
        res.json(noteContent);
        
    });
        
};
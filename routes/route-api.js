const fs = require ("fs");
var data = JSON.parse(fs.readFileSync(",utf8"));

// export module
module.exports = function (app) {
    const notesData = require('');


    // Getting all the data for the notes
    app.get("/api/notes", (req, res) => {
        res.json(notesData);
    });

    // Getting a specific note depending on the ID
    app.get("/api/notes/:id", (req, res) => {
        // explain
        const noteId = Number(req.params.id);
        // explain
        const note = notesData.find(note => note.id === noteId);
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    });

    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        const uniqueId = String(data.length); // Assuming 'data' is an array
        newNote.id = uniqueId;

        data.push(newNote);

        // Write data to file asynchronously
        fs.writeFile("./db/db.json", JSON.stringify(data), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to save your note' });
                return;
            }
            res.json(data);
        });
    });
};























};
    
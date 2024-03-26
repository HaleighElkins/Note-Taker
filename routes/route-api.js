
const fs = require("fs");
const util = require("util");
var data = JSON.parse(fs.readFileSync('./db.json', "utf8"));

// Export module
module.exports = function (app) {
    app.get("/api/notes", (req, res) => {
        res.json(data);
    });
    // Getting a specific note depending on the ID
    app.get("/api/notes/:id", (req, res) => {
        const noteId = Number(req.params.id);
        const note = data.find(note => note.id === noteId);
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    });

    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        // Generate a unique ID for the new note
        const uniqueId = Date.now().toString();
        newNote.id = uniqueId;

        // Adding a new note to the existing array
        data.push(newNote);

        // Write data to file asynchronously
        fs.writeFile("./db.json", JSON.stringify(data), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to save your note' });
                return;
            }
            res.json(data);
        });
    });

    app.delete("/api/notes/:id", async (req, res) => {
        try {
            const noteId = req.params.id;
            console.log(`Deleting note with ID ${noteId}`);

            // Filtering out the note with the ID that was given
            const filteredData = data.filter(currentNote => currentNote.id !== noteId);

            // Write updated data back to the file
            fs.writeFile("./db.json", JSON.stringify(filteredData), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Failed to delete the note' });
                    return;
                }
                res.json(filteredData);
            });
        } catch (error) {
            console.error("Error deleting note:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
};



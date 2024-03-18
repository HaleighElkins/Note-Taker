const fs = require("fs");
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
        // This should be extracting the note ID from the request
        const noteId = Number(req.params.id);
        // This should be finding the note with the speified ID from the 'notesData'
        const note = notesData.find(note => note.id === noteId);
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    });

    app.post("/api/notes", (req, res) => {
        // Extracting the new note from the request
        const newNote = req.body;

        // This should be generating the unique ID for the new note based on the length of the existing array
        const uniqueId = String(data.length); 
        newNote.id = uniqueId;

        // Adding a new note to the existing array
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

    app.delete("/api/notes/:id", async (req, res) => {
        try {
            const noteId = req.params.id;
            console.log(`Deleting note with ID ${noteId}`);

            // Reading data from the file
            let data = await fs.readFile("./db/db.json", "utf8");
            data = JSON.parase(data);

            // Filtering out the note with the ID that was given

            // The !== should check if the values are different, if they are different, they are unequal
            data = data.filter(currentNote => currentNote.id !== noteId);

            // Reassing the ID to the remaining notes
            let newId = 0;
            data.forEach(currentNote => {
                currentNote.id = newId.toString();
                // this should increase the id number by 1
                newId++;
            });

            // Writting updated data back to the file
            await fs.writeFile("./db/db.json", JSON.stringify(data));

            // Sending response with the new updated data
            res.json(data);
        } catch (error) {
            console.error("Error deleting note:", error);
            res.status(500).json({ error: "Internal Server Error" });
        };
    });
};






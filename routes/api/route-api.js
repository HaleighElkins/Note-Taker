const router = require("express").Router();
// const router = express.Router();
const fs = require("fs");

// Load data from JSON file
let data = [];
try {
    data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
} catch (error) {
    console.error("Error loading data from JSON file:", error);
}

router.get("/", (req, res) => {
    res.json(data);
});

router.post("/", (req, res) => {
    const newNote = req.body;
    // Generate a unique ID for the new note
    const uniqueId = Date.now().toString();
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

router.delete("/notes/:id", async (req, res) => {
    try {
        const noteId = req.params.id;
        console.log(`Deleting note with ID ${noteId}`);

        // Filtering out the note with the ID that was given
        const filteredData = data.filter(currentNote => currentNote.id !== noteId);

        // Write updated data back to the file
        fs.writeFile("./db/db.json", JSON.stringify(filteredData), (err) => {
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

module.exports = router;



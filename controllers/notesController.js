import { listNotes as getNotesList, renderNote as getRenderNote, checkGrammar as getCheckGrammar } from "../services/notesService.js";

function uploadNote(req, res) {
    if(!req.file) {
        return res.status(400).json({message: "No file uploaded"});
    }
    res.status(201).json({
        message: "File uploaded successfully",
        file: req.file,
    });
}

async function listNotes(req, res) {
    try {
        const notesList = await getNotesList();
        res.status(200).json({ notes: notesList});
    } catch (error) {
        res.status(500).json({ message: "Error retrieving notes", error: error.message });
    }
}

async function renderNote(req, res) {
    try {
        const { filename} = req.params;
        const renderedContent = await getRenderNote(filename);
        res.status(200).json({ content: renderedContent });

    } catch (error) {
        if (error.code === "ENOENT") {
            res.status(404).json({ message: "Note not found" });
        } else {
            res.status(500).json({ message: "Error rendering note", error: error.message });
        }
    }
}

async function checkGrammar(req, res) {
    try {
        const { filename } = req.params;
        const grammarCheckResult = await getCheckGrammar(filename);
        res.status(200).json({ result: grammarCheckResult });
    } catch (error) {
        if (error.code === "ENOENT") {
            res.status(404).json({ message: "Note not found" });
        } else {
            res.status(500).json({ message: "Error checking grammar", error: error.message });
        }
    }
}

export  {uploadNote, listNotes, renderNote, checkGrammar};
function uploadNote(req, res) {
    res.json({
        message: "File uploaded successfully",
        file: req.file,
    });
}

export default uploadNote;
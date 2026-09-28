import express from "express";
import upload from "../middlewares/upload.js";
import uploadNote from "../controllers/notesController.js";
const router = express.Router();

router.post("/uploads", upload.single("file"), uploadNote);

export default router;
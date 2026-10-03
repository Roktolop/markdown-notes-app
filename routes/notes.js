import express from "express";
import upload from "../middlewares/upload.js";
import {listNotes, uploadNote, renderNote, checkGrammar} from "../controllers/notesController.js";

const router = express.Router();

router.post("/", upload.single("file"), uploadNote);
router.get("/", listNotes);
router.get("/:filename/html", renderNote);
router.get("/:filename/grammar", checkGrammar);


export default router;
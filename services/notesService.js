import fsPromises from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import MarkdownIt from "markdown-it";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "..", "uploads");

const md =new MarkdownIt();

async function readNoteFile(filename) {
    const filePath = path.join(uploadsDir, filename);
    const fileContent = await fsPromises.readFile(filePath, "utf-8");
    
    return fileContent;
}

async function listNotes() {
    return await fsPromises.readdir(uploadsDir);
}

async function renderNote(filename) {
    const fileContent = await readNoteFile(filename);
    const rendererContent = md.render(fileContent);
        
    return rendererContent;
}

async function checkGrammar(filename) {
    const fileContent = await readNoteFile(filename);
    
    const params = new URLSearchParams();
    params.append("text", fileContent);
    params.append("language", "auto");

    // Implementation for grammar checking would go here
    const checkResult = await axios.post("https://api.languagetool.org/v2/check", params);

    return checkResult.data;

}

export { listNotes, renderNote, checkGrammar };
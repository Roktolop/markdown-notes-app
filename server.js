import express from "express";
import router from "./routes/notes.js";


const app = express();
app.use("/notes", router);

app.listen(3000, () =>{
    console.log("Server is running on port 3000");
});
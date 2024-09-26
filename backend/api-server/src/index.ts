import express from "express";

const app = express();

app.use(express.json());


app.post("/", (req, res) => {
    const { language, slug } = req.body;
    
});
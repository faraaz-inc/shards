import express from "express";
import { Orchestrator } from "./orchestrator";

const app = express();
const PORT = 3000;

app.use(express.json());


app.post("/", async(req, res) => {
    const { language, slug } = req.body;

    const response = await Orchestrator.getInstance().createPod(slug, language);
    res.json({msg: response});
});

app.listen(PORT, () => console.log("Listening on " + PORT));
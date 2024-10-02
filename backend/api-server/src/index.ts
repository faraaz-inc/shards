import express from "express";
import { Orchestrator } from "./orchestrator";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post("/", async(req, res) => {
    const { slug } = req.body;

    try {
        const resPod = await Orchestrator.getInstance().createPod(slug);
        const resSvc = await Orchestrator.getInstance().createService(slug);
        const resIng = await Orchestrator.getInstance().createIngress(slug);
        res.json({success: true, msg: "Pod and Service created succesfully"});

    }
    catch(err) {
        res.json({msg: err});
    }
});

app.delete("/", async(req, res) => {
    const { slug } = req.body;

    try {
        const resp = await Orchestrator.getInstance().deletePod(slug);

        res.json({success: true, msg: "Pod deleted succesfully"});
    }
    catch(err) {
        console.log(err);
        res.json({msg: "Error deleting"});
    }
})

app.listen(PORT, () => console.log("Listening on " + PORT));
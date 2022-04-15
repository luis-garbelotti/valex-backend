import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Running on " + PORT);
});
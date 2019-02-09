import dotenv from "dotenv";
import express from "express";
import backend from "./backend";

dotenv.config();
const port = process.env.SERVER_PORT || 3000;
const nodeEnv = process.env.NODE_ENV || "development";

backend.set("port", port);

if (nodeEnv === "production") {
    backend.use(express.static("frontend/dist/pompmast-server-frontend"));
}

backend.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello world!");
});

// start the express server
backend.listen(backend.get("port"), () => {
    console.log(`server started at http://localhost:${backend.get("port")}`);
});

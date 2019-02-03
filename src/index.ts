import dotenv from "dotenv";
import express from "express";

dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();

app.set("port", process.env.SERVER_PORT || 3000);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/dist/pompmast-server-frontend"));
}

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello world!");
});

// start the express server
app.listen(app.get("port"), () => {
    console.log(`server started at http://localhost:${app.get("port")}`);
});

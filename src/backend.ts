import bodyParser from "body-parser";
import express from "express";
import { PompmastRoutes } from "./routes/pompmastroutes";

class Backend {
    public backend: express.Application;
    public pompmastRoutes: PompmastRoutes = new PompmastRoutes();

    constructor() {
        this.backend = express();
        this.config();
        this.pompmastRoutes.routes(this.backend);
    }

    private config(): void {
        // Support application/json type post data
        this.backend.use(bodyParser.json());
    }
}

export default new Backend().backend;

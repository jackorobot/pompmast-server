import bodyParser from "body-parser";
import express from "express";

class Backend {
    public backend: express.Application;

    constructor() {
        this.backend = express();
        this.config();
    }

    private config(): void {
        // Support application/json type post data
        this.backend.use(bodyParser.json());
    }
}

export default new Backend().backend;

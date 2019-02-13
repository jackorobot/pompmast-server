import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { IController } from "./interfaces/controller";

class Backend {
    public backend: express.Application;

    constructor(controllers: any[]) {
        this.backend = express();

        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public listen() {
        this.backend.listen(process.env.SERVER_PORT, () => {
            console.log(`App listening on the port ${process.env.SERVER_PORT}`);
        });
    }

    private initializeMiddlewares(): void {
        // Support application/json type post data
        this.backend.use(bodyParser.json());
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.backend.use("/", controller.router);
        });
    }

    private connectToTheDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH,
        } = process.env;
        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, { useNewUrlParser: true });
    }
}

export default Backend;

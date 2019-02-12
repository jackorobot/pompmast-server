import bodyParser from "body-parser";
import express from "express";

class Backend {
    public backend: express.Application;
    public port: number;
    public environment: string;

    constructor(controllers: any[], port: number, environment: string) {
        this.backend = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public listen() {
        this.backend.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

    private initializeMiddlewares(): void {
        // Support application/json type post data
        this.backend.use(bodyParser.json());
    }

    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
            this.backend.use("/", controller.router);
        });
    }
}

export default Backend;

import { Application, Request, Response } from "express";

export class PompmastRoutes {
    public routes(app: Application): void {
        app.route("/")
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: "GET request succesful"
                });
            });
    }
}

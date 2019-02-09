import { Application, Request, Response } from "express";

export class PompmastRoutes {
    public routes(app: Application): void {
        app.route("/")
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: "GET request succesful"
                });
            });

        // Sounds
        app.route("/sound")
            // Get all sounds
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: "Got get request at sound"
                });
            })
            // Upload a new sound
            .post((req: Request, res: Response) => {
                res.status(200).send({
                    message: "Got post request at sound"
                });
            });

        // Sound details
        app.route("/sound/:soundId")
            // Get a single sounds details
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: `Got get request at sound with id: ${req.params.soundId}`
                });
            })
            // Update a sound
            .put((req: Request, res: Response) => {
                res.status(200).send({
                    message: `Got put request at sound with id: ${req.params.soundId}`
                });
            })
            // Delete a sound
            .delete((req: Request, res: Response) => {
                res.status(200).send({
                    message: `Got delete request at sound with id: ${req.params.soundId}`
                });
            });
    }
}

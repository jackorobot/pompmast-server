import { NextFunction, Request, Response, Router } from "express";
import { ISoundModel, Sound } from "../models/sound";

export const PARAM_SOUND_ID: string = "soundId";

export class SoundController {
    public rootPath = "/sound";
    public rootRouter = Router();

    public idPath = this.rootPath + `/:${PARAM_SOUND_ID}`;

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.rootRouter.route(this.rootPath)
            .get(this.getSounds)
            .post(this.addNewSound);

        this.rootRouter.route(this.idPath)
            .all(this.checkSoundIdIsGiven)
            .get(this.getSoundById)
            .put(this.updateSoundById)
            .delete(this.deleteSoundById);
    }

    private checkSoundIdIsGiven(req: Request, res: Response, next: NextFunction) {
        if (typeof req.params[PARAM_SOUND_ID] === "undefined" || req.params[PARAM_SOUND_ID] === null) {
            res.sendStatus(404);
            return;
        }
        next();
    }

    private addNewSound(req: Request, res: Response, next: NextFunction): void {
        const newSound = new Sound(req.body);
        newSound.save()
            .then((sound: ISoundModel) => {
                res.send(sound);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    private getSounds(req: Request, res: Response, next: NextFunction): void {
        Sound.find({})
            .then((sounds: ISoundModel[]) => {
                res.send(sounds);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    private getSoundById(req: Request, res: Response, next: NextFunction): void {
        Sound.findById(req.params[PARAM_SOUND_ID])
            .then((sound: ISoundModel) => {
                res.send(sound);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    private updateSoundById(req: Request, res: Response, next: NextFunction): void {
        Sound.findByIdAndUpdate(req.params[PARAM_SOUND_ID], req.body, { new: true })
            .then((sound: ISoundModel) => {
                res.send(sound);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    private deleteSoundById(req: Request, res: Response, next: NextFunction): void {
        Sound.findByIdAndDelete(req.params[PARAM_SOUND_ID])
            .then((sound: ISoundModel) => {
                res.send({ message: "Sound deleted succesfully" });
            })
            .catch((err) => {
                res.send(err);
            });
    }
}

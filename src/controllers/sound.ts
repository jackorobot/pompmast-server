import { NextFunction, Request, Response, Router } from "express";
import { IController } from "../interfaces/controller";
import { ISound } from "../interfaces/sound";
import { SoundModel } from "../models/sound";

export const PARAM_SOUND_ID: string = "soundId";

export class SoundController implements IController {
    public router = Router();
    private path = "/sound";
    private idPath = this.path + `/:${PARAM_SOUND_ID}`;

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.route(this.path)
            .get(this.getSounds)
            .put(this.addNewSound);

        this.router.route(this.idPath)
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
        const newSound = new SoundModel(req.body);
        newSound.save()
            .then((sound: ISound) => {
                res.send(sound);
            })
            .catch(next);
    }

    private getSounds(req: Request, res: Response, next: NextFunction): void {
        SoundModel.find({})
            .then((sounds: ISound[]) => {
                res.send(sounds);
            })
            .catch(next);
    }

    private getSoundById(req: Request, res: Response, next: NextFunction): void {
        SoundModel.findById(req.params[PARAM_SOUND_ID])
            .then((sound: ISound) => {
                res.send(sound);
            })
            .catch(next);
    }

    private updateSoundById(req: Request, res: Response, next: NextFunction): void {
        SoundModel.findByIdAndUpdate(req.params[PARAM_SOUND_ID], req.body, { new: true })
            .then((sound: ISound) => {
                res.send(sound);
            })
            .catch(next);
    }

    private deleteSoundById(req: Request, res: Response, next: NextFunction): void {
        SoundModel.findByIdAndDelete(req.params[PARAM_SOUND_ID])
            .then((sound: ISound) => {
                res.send({ message: "Sound deleted succesfully" });
            })
            .catch(next);
    }
}

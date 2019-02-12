import { Document, Model, model, Schema } from "mongoose";
import { ISound } from "../interfaces/sound";

export interface ISoundModel extends ISound, Document { }

export const SoundSchema = new Schema({
    displayname: {
        required: "No displayname given",
        type: String
    },
    duration: {
        type: Number
    },
    filename: {
        type: String
    }
});

export const Sound: Model<ISoundModel> = model<ISoundModel>("Sound", SoundSchema);

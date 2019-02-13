import { Document, Model, model, Schema } from "mongoose";
import { ISound } from "../interfaces/sound";

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

export const SoundModel: Model<ISound & Document> = model<ISound & Document>("Sound", SoundSchema);

import "dotenv/config";
import Backend from "./backend";
import { SoundController } from "./controllers/sound";
import validateEnv from "./util/validateEnv";

validateEnv();

const backend = new Backend(
    [
        new SoundController()
    ]
);

backend.listen();

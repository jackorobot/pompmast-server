import dotenv from "dotenv";
import express from "express";
import Backend from "./backend";
import { SoundController } from "./controllers/sound";

dotenv.config();
const port = parseInt(process.env.SERVER_PORT, 10) || 3000;
const environment = process.env.NODE_ENV || "development";

const backend = new Backend(
    [
        new SoundController()
    ],
    port,
    environment
);

backend.listen();

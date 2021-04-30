import express from "express";
import { MusicController } from "../controller/MusicController";

export const musicRouter = express.Router()

const musicController = new MusicController()

musicRouter.post("/create", musicController.music)
musicRouter.get("/getAll/:id", musicController.getAllMusic)

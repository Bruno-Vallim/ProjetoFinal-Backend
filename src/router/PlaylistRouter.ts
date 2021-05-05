import express from "express";
import { PlaylistController } from "../controller/PlaylistController";

export const playlistRouter = express.Router()

const playlistController = new PlaylistController()

playlistRouter.post("/createPlaylist", playlistController.playlist)
playlistRouter.get("/getAll/:id", playlistController.getAllPlaylist)
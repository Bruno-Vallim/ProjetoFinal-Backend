import { Request, Response } from "express";
import PlaylistBusiness from "../business/PlaylistBusiness";
import { GetData } from "../services/getData";

export class PlaylistController {
    public async playlist(req: Request, res: Response) {
      try {
        const { name } = req.body;
  
        const token = req.headers.authorization as string;
  
        const getData = new GetData();
  
        const id_user = getData.getData(token);
  
        const result = await PlaylistBusiness.playlist(name, String(id_user.id));
        res.status(200).send(result);
      } catch (error) {
        const { statusCode, message } = error;
        res.status(statusCode || 400).send({ message });
      }
    }
  
    public async getAllPlaylist(req: Request, res: Response) {
      try {
        const token = req.headers.authorization as string;
        const id = req.params.id;
  
        const result = await PlaylistBusiness.getPlaylistBusiness(id, token);
  
        res.status(200).send(result);
      } catch (error) {
        const { statusCode, message } = error;
        res.status(statusCode || 400).send({ message });
      }
    }
  }
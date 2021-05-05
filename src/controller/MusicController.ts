import { Request, Response } from "express";
import MusicBusiness from "../business/MusicBusiness";
import { GetData } from "../services/getData";
import { AuthenticationData } from "../services/tokenGenerator";

export class MusicController {
  public async music(req: Request, res: Response) {
    try {
      const { band, music, music_genre, url } = req.body;

      const token = req.headers.authorization as string;

      const getData = new GetData();

      const id_user = getData.getData(token);

      const result = await MusicBusiness.music(band, music, music_genre, url, String(id_user.id));
      res.status(200).send(result);
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }

  public async getAllMusic(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id;

      const result = await MusicBusiness.getMusicBusiness(id, token);

      res.status(200).send(result);
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }
}



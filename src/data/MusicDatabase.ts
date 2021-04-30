import BaseDataBase from "./BaseDatabase";
import { Music } from "../model/Music"

export class MusicDatabase extends BaseDataBase {

   protected tableName: string = "MUSIC_FULLSTACK";

   private toModel(dbModel?: any): Music | undefined {
      return (
         dbModel &&
         new Music(
            dbModel.id,
            dbModel.title,
            dbModel.url,
            dbModel.user_id           
         )
      );
   }

   public async createMusic(music: Music): Promise<void> {
      try {
         await BaseDataBase.connection.raw(`
            INSERT INTO ${this.tableName} (id, title, url, id_user)
            VALUES (
            '${music.getId()}', 
            '${music.getTitle()}',
            '${music.getUrl()}', 
            '${music.getUser_Id()}'
            );`
         );
      } catch (error) {
         throw new Error(error.sqlMessage || error.message)
      }
   }

   public async getMusicById(id: string): Promise<Music | undefined> {
    try {
       const result = await BaseDataBase.connection.raw(`
          SELECT * from ${this.tableName} WHERE id = '${id}'
       `);
       return this.toModel(result[0][0]);
    } catch (error) {
       throw new Error(error.sqlMessage || error.message)
    }
 }
}

export default new MusicDatabase()
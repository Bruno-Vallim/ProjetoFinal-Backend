import BaseDataBase from "./BaseDatabase";
import { Playlist } from "../model/Playlist"


export class PlaylistDatabase extends BaseDataBase {

  protected tableName: string = "PLAYLIST_FULLSTACK";

  private toModel(dbModel?: any): Playlist | undefined {
     return (
        dbModel &&
        new Playlist(
           dbModel.id,
           dbModel.name,
           dbModel.user_id           
        )
     );
  }

  public async createPlaylist(playlist: Playlist): Promise<void> {
     try {
        await BaseDataBase.connection.raw(`
           INSERT INTO ${this.tableName} (id, name, id_user)
           VALUES (
           '${playlist.getId()}', 
           '${playlist.getName()}',
           '${playlist.getUser_Id()}'
           );`
        );
     } catch (error) {
        throw new Error(error.sqlMessage || error.message)
     }
  }

  public async getPlaylistById(id: string): Promise<Playlist | undefined> {
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

export default new PlaylistDatabase()
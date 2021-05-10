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

 public async addMusicPlaylist(name:string, id_music:string): Promise<void>{
    try {

       const result = await BaseDataBase.connection.raw(`
       SELECT id 
       FROM PLAYLIST_FULLSTACK
       WHERE name = "${name}"
       `)
       const id_playlist = result[0][0]
       
       await BaseDataBase.connection.raw(`
         INSERT INTO PLAYLIST_MUSIC_FULLSTACK (id_playlist, id_music)
         VALUES(
            '${id_playlist.id}',
            '${id_music}'
         )      
       `)
       
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
 }
}

export default new PlaylistDatabase()
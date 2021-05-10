import { CustomError } from "../errors/CustomError";
import { IdGenerator } from "../services/idGenerator";
import tokenGenerator, { TokenGenerator } from "../services/tokenGenerator";
import { PlaylistDatabase } from "../data/PlaylistDatabase";
import { Playlist } from "../model/Playlist";

export class PlaylistBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private tokenGenerator: TokenGenerator,
      private playlistDatabase: PlaylistDatabase
   ) { }

   public async playlist(
      name: string,
      id_user: string
      
   ) {
      try {
         if (!name || !id_user) {
            throw new CustomError(422, "Missing input");
         }

         const id = this.idGenerator.generate();


         await this.playlistDatabase.createPlaylist(
            new Playlist (id, name, id_user)
         );

         const accessToken = this.tokenGenerator.generate({
            id
         });
         return { accessToken };

      } catch (error) {

         throw new CustomError(error.statusCode, error.message)
      }

   }
   public async getPlaylistBusiness(id:string, token:string){
      try {
         if(!id || !token){
            throw new CustomError(422, "Missing Inputs");
            
         }
         const result = await this.playlistDatabase.getPlaylistById(id)
         
         return { result }

      } catch (error) {
         throw new CustomError(error.statusCode, error.message)
      }
   }

   public async getPlaylistByName(name:string, token:string, id_music: string){
      try {
         if(!name || !token || !id_music){
            throw new CustomError(422, "Missing Inputs");
            
         }
         const result = await this.playlistDatabase.addMusicPlaylist(name, id_music)
         
         return { result }

      } catch (error) {
         throw new CustomError(error.statusCode, error.message)
      }
   }
}

export default new PlaylistBusiness(
   new IdGenerator(),
   new TokenGenerator(),
   new PlaylistDatabase()
)
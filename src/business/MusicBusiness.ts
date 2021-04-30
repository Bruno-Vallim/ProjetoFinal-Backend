import { CustomError } from "../errors/CustomError";
import { IdGenerator } from "../services/idGenerator";
import tokenGenerator, { TokenGenerator } from "../services/tokenGenerator";
import { MusicDatabase } from "../data/MusicDatabase";
import { Music } from "../model/Music";

export class MusicBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private tokenGenerator: TokenGenerator,
      private musicDatabase: MusicDatabase
   ) { }

   public async music(
      title: string,
      url: string,
      id_user: string,
      
   ) {
      try {
         if (!title || !url || !id_user) {
            throw new CustomError(422, "Missing input");
         }

         const id = this.idGenerator.generate();


         await this.musicDatabase.createMusic(
            new Music (id, title, url, id_user)
         );

         const accessToken = this.tokenGenerator.generate({
            id
         });
         return { accessToken };

      } catch (error) {

         throw new CustomError(error.statusCode, error.message)
      }

   }
   public async getMusicBusiness(id:string, token:string){
      try {
         if(!id || !token){
            throw new CustomError(422, "Missing Inputs");
            
         }
         const result = await this.musicDatabase.getMusicById(id)
         
         return { result }

      } catch (error) {
         throw new CustomError(error.statusCode, error.message)
      }
   }
}

export default new MusicBusiness(
   new IdGenerator(),
   new TokenGenerator(),
   new MusicDatabase()
)
export class Music {
    constructor(
      private id: string,
      private band: string,
      private music: string,
      private music_genre: string,
      private url: string,
      private id_user: string
    ) {}
  
    public getId(): string {
      return this.id;
    }
  
    public getBand(): string {
      return this.band;
    }
    public getMusic(): string {
      return this.music;
    }
    public getMusicGenre(): string {
      return this.music_genre;
    }
  
    public getUrl(): string {
      return this.url;
    }
  
    public getUser_Id(): string {
      return this.id_user;
    }

  }
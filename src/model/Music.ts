export class Music {
    constructor(
      private id: string,
      private title: string,
      private url: string,
      private id_user: string
    ) {}
  
    public getId(): string {
      return this.id;
    }
  
    public getTitle(): string {
      return this.title;
    }
  
    public getUrl(): string {
      return this.url;
    }
  
    public getUser_Id(): string {
      return this.id_user;
    }

  }
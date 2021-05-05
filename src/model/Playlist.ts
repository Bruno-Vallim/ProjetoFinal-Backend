export class Playlist {
  constructor(
    private id: string,
    private name: string,
    private id_user: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getUser_Id(): string {
    return this.id_user;
  }

}
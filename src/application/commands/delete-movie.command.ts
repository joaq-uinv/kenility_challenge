export class DeleteMovieCommand {
  public constructor(private _id: string) {}

  get id() {
    return this._id;
  }
}

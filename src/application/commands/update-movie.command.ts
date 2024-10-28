export class UpdateMovieCommand {
  public constructor(
    private _id: string,
    private _title: string,
    private _director: string,
    private _releaseDate: string,
  ) {}

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get director() {
    return this._director;
  }

  get releaseDate() {
    return this._releaseDate;
  }
}

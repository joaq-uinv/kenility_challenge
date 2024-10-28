export class CreateMovieCommand {
  public constructor(
    private _title: string,
    private _episodeId: number,
    private _openingCrawl: string,
    private _director: string,
    private _releaseDate: string,
  ) {}

  get title() {
    return this._title;
  }

  get episodeId() {
    return this._episodeId;
  }

  get openingCrawl() {
    return this._openingCrawl;
  }

  get director() {
    return this._director;
  }

  get releaseDate() {
    return this._releaseDate;
  }
}

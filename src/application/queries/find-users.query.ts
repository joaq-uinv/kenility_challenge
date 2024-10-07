export class FindUsersQuery {
  constructor(
    private _filters: any,
    private _page: number,
  ) {}

  public get filters() {
    return this._filters;
  }

  public get page() {
    return this._page;
  }
}

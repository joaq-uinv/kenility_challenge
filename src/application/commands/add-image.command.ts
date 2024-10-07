export class AddImageCommand {
  public constructor(
    private _id: string,
    private _profilePicture: any,
  ) {}

  get id() {
    return this._id;
  }

  get profilePicture() {
    return this._profilePicture;
  }
}

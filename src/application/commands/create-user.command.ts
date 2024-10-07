export class CreateUserCommand {
  public constructor(
    private _id: string,
    private _name: string,
    private _lastName: string,
    private _address: string,
    private _profilePicture: string,
  ) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get lastName() {
    return this._lastName;
  }

  get address() {
    return this._address;
  }

  get profilePicture() {
    return this._profilePicture;
  }
}

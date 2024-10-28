export class LoginCommand {
  public constructor(
    private _name: string,
    private _password: string,
  ) {}

  get name() {
    return this._name;
  }

  get password() {
    return this._password;
  }
}

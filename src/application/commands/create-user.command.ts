export class CreateUserCommand {
  public constructor(
    private _name: string,
    private _role: string,
    private _password: string,
  ) {}

  get name() {
    return this._name;
  }

  get role() {
    return this._role;
  }

  get password() {
    return this._password;
  }
}

export class UpdateUserCommand {
  public constructor(
    private id: string,
    private name?: string,
    private lastName?: string,
    private address?: string,
    private profilePicture?: string,
  ) {}

  get _id(): string {
    return this.id;
  }

  get _name() {
    return this.name;
  }

  get _lastName() {
    return this.lastName;
  }

  get _conditions() {
    return this.address;
  }

  get _address() {
    return this.address;
  }

  get _profilePicture() {
    return this.profilePicture;
  }
}

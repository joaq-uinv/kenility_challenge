export class User {
  private id: string;
  private name: string;
  private lastName: string;
  private address: string;
  private profilePicture: string;

  private created_at: Date;
  private updated_at: Date;
  private deleted_at: Date;

  static create(
    id: string,
    name: string,
    lastName: string,
    address: string,
    profilePicture: string,
  ): User {
    const user = new User();

    user.id = id;
    user.name = name;
    user.lastName = lastName;
    user.address = address;
    user.profilePicture = profilePicture;

    user.created_at = new Date();
    user.updated_at = new Date();
    user.deleted_at = null;

    return user;
  }

  static fromPrimitives(primitives: any): User {
    const user = new User();

    user.id = primitives.id;
    user.name = primitives.name;
    user.lastName = primitives.lastName;
    user.address = primitives.address;
    user.profilePicture = primitives.profilePicture;

    user.created_at = new Date(primitives.created_at);
    user.updated_at = new Date(primitives.updated_at);
    user.deleted_at = new Date(primitives.deleted_at);

    return user;
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      address: this.address,
      profilePicture: this.profilePicture,
      created_at: this.created_at.getTime(),
      updated_at: this.updated_at.getTime(),
      deleted_at: this.deleted_at?.getTime(),
    };
  }

  public getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getlastName() {
    return this.lastName;
  }

  getAddress() {
    return this.address;
  }

  getprofilePicture() {
    return this.profilePicture;
  }

  update(updatedProperties: any) {
    Object.keys(updatedProperties).forEach((key) => {
      // Check if the property exists in props
      if (
        key in this &&
        updatedProperties[key] !== null &&
        updatedProperties[key] !== undefined
      ) {
        this[key] = updatedProperties[key];
      }
    });

    this.updated_at = new Date();

    this.toPrimitives();

    return this.toPrimitives();
  }

  delete() {
    this.deleted_at = new Date();
  }
}

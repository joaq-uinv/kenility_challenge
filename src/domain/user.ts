export class User {
  private name: string;
  private role: string;
  private password: string;

  private created_at: Date;
  private updated_at: Date;
  private deleted_at: Date;

  static create(name: string, role: string, password: string): User {
    const user = new User();

    user.name = name;
    user.role = role;
    user.password = password;

    user.created_at = new Date();
    user.updated_at = new Date();
    user.deleted_at = null;

    return user;
  }

  static fromPrimitives(primitives: any): User {
    const user = new User();

    user.name = primitives.name;
    user.role = primitives.role;
    user.password = primitives.password;

    user.created_at = new Date(primitives.created_at);
    user.updated_at = new Date(primitives.updated_at);
    user.deleted_at = new Date(primitives.deleted_at);

    return user;
  }

  toPrimitives() {
    return {
      name: this.name,
      role: this.role,
      password: this.password,

      created_at: this.created_at.getTime(),
      updated_at: this.updated_at.getTime(),
      deleted_at: this.deleted_at?.getTime(),
    };
  }

  getName() {
    return this.name;
  }

  getPassword() {
    return this.password;
  }

  getRole() {
    return this.role;
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

import { Inject, NotFoundException } from '@nestjs/common';

import { UserRepository } from '../../domain/user-repository.interface';
import { UpdateUserCommand } from './update-user.command';

export class UpdateUserHandler {
  constructor(
    @Inject('UserRepository')
    private repository: UserRepository,
  ) {}

  public async handle(command: UpdateUserCommand): Promise<void> {
    const user = await this.repository.findById(command._id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    user.update({
      id: command._id,
      name: command._name,
      lastName: command._lastName,
      address: command._address,
      profilePicture: command._profilePicture,
    });

    return await this.repository.save(user);
  }
}

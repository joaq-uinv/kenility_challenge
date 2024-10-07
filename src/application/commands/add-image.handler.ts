import { Inject, NotFoundException } from '@nestjs/common';

import { UserRepository } from '../../domain/user-repository.interface';
import { AddImageCommand } from './add-image.command';

export class AddImageHandler {
  constructor(
    @Inject('UserRepository')
    private repository: UserRepository,
  ) {}

  public async handle(command: AddImageCommand): Promise<void> {
    const user = await this.repository.findById(command.id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    user.update({
      profilePicture: command.profilePicture,
    });

    return await this.repository.save(user);
  }
}

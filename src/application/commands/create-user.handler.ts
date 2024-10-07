import { Inject, Injectable, BadRequestException } from '@nestjs/common';

import { CreateUserCommand } from './create-user.command';

import { User } from '../../domain/user';

import { UserRepository } from '../../domain/user-repository.interface';

@Injectable()
export class CreateUserHandler {
  constructor(
    @Inject('UserRepository')
    private repository: UserRepository,
  ) {}

  public async handle(command: CreateUserCommand): Promise<void> {
    let user = await this.repository.findById(command.id);

    if (user) {
      throw new BadRequestException(
        `user with id: ${command.id} already exists`,
      );
    }

    user = User.create(
      command.id,
      command.name,
      command.lastName,
      command.address,
      command.profilePicture,
    );

    await this.repository.save(user);
  }
}

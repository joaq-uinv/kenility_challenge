import { Inject, Injectable, BadRequestException } from '@nestjs/common';

import { hash } from 'bcrypt';

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
    let user = await this.repository.findByName(command.name);

    if (user) {
      throw new BadRequestException(
        `user with name: ${command.name} already exists`,
      );
    }

    const saltRounds = 10;
    const password = await hash(command.password, saltRounds);

    user = User.create(command.name, command.role, password);

    await this.repository.save(user);
  }
}

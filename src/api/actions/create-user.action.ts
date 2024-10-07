import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserHandler } from '../../application/commands/create-user.handler';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { CreateUserRequest } from '../../domain/contracts/create-user.request';

@Controller({ path: '/users', version: '1' })
export class CreateUserAction {
  constructor(private handler: CreateUserHandler) {}

  @Post('/')
  public async execute(@Body() body: CreateUserRequest): Promise<any> {
    const command = new CreateUserCommand(
      body.id,
      body.name,
      body.lastName,
      body.address,
      body.profilePicture,
    );

    return await this.handler.handle(command);
  }
}

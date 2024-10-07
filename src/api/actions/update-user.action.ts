import { Body, Controller, Put, Param } from '@nestjs/common';

import { UpdateUserCommand } from '../../application/commands/update-user.command';
import { UpdateUserHandler } from '../../application/commands/update-user.handler';
import { UpdateUserRequest } from '../../domain/contracts/update-user.request';

@Controller({ path: '/users', version: '1' })
export class UpdateUserAction {
  constructor(private handler: UpdateUserHandler) {}

  @Put('/:id')
  public async execute(
    @Body() body: UpdateUserRequest,
    @Param('id') id: string,
  ): Promise<void> {
    const command = new UpdateUserCommand(
      id,
      body.name,
      body.lastName,
      body.address,
      body.profilePicture,
    );

    await this.handler.handle(command);
  }
}

import { Body, Controller, Post } from '@nestjs/common';

import { LoginRequest } from '../../domain/contracts/login.request';
import { LoginCommand } from '../../application/commands/login.command';
import { LoginHandler } from '../../application/commands/login.handler';

@Controller({ path: '/auth', version: '1' })
export class LoginAction {
  constructor(private handler: LoginHandler) {}

  @Post('/login')
  public async execute(@Body() body: LoginRequest): Promise<any> {
    const command = new LoginCommand(body.id);

    const res = await this.handler.handle(command);

    return res;
  }
}

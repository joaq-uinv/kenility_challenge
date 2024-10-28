import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { CreateUserHandler } from '../../application/commands/create-user.handler';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { CreateUserRequest } from '../../domain/contracts/create-user.request';

import { LoginRequest } from '../../domain/contracts/login.request';
import { LoginCommand } from '../../application/commands/login.command';
import { LoginHandler } from '../../application/commands/login.handler';

@ApiTags('auth')
@Controller({ path: '/auth', version: '1' })
export class AuthActions {
  constructor(
    private registerHandler: CreateUserHandler,
    private loginHandler: LoginHandler,
  ) {}

  @Post('/register')
  public async register(@Body() body: CreateUserRequest): Promise<void> {
    const command = new CreateUserCommand(body.name, body.role, body.password);

    return await this.registerHandler.handle(command);
  }

  @Post('/login')
  @ApiResponse({
    schema: {
      example: {
        token: { type: 'string' },
      },
    },
  })
  public async login(@Body() body: LoginRequest): Promise<any> {
    const command = new LoginCommand(body.name, body.password);

    const res = await this.loginHandler.handle(command);

    return res;
  }
}

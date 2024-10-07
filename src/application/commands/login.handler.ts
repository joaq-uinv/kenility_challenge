import { Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginCommand } from './login.command';

import { UserRepository } from '../../domain/user-repository.interface';

export class LoginHandler {
  constructor(
    @Inject(forwardRef(() => 'UserRepository'))
    private repository: UserRepository,
    private jwtService: JwtService,
  ) {}

  private async validateUser(id: string): Promise<any> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  public async handle(command: LoginCommand) {
    let user = await this.validateUser(command.id);

    user = {
      ...user,
    };

    return {
      token: this.jwtService.sign(user, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}

import { Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';

import { LoginCommand } from './login.command';

import { UserRepository } from '../../domain/user-repository.interface';

export class LoginHandler {
  constructor(
    @Inject(forwardRef(() => 'UserRepository'))
    private repository: UserRepository,
    private jwtService: JwtService,
  ) {}

  private async validateUser(name: string, password: string): Promise<any> {
    const user = await this.repository.findByName(name);

    const match = await compare(password, user.getPassword());

    if (!user || !match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  public async handle(command: LoginCommand) {
    let user = await this.validateUser(command.name, command.password);

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

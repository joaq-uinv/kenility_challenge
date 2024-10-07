import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InfrastructureModule } from '../infrastructure/infrastructure.module';

import { LoginHandler } from './commands/login.handler';
import { CreateUserHandler } from './commands/create-user.handler';
import { FindUsersHandler } from './commands/find-users.handler';
import { UpdateUserHandler } from './commands/update-user.handler';
import { AddImageHandler } from './commands/add-image.handler';

@Module({
  imports: [InfrastructureModule],
  providers: [
    LoginHandler,
    JwtService,
    CreateUserHandler,
    FindUsersHandler,
    UpdateUserHandler,
    AddImageHandler,
  ],
  exports: [
    LoginHandler,
    CreateUserHandler,
    FindUsersHandler,
    UpdateUserHandler,
    AddImageHandler,
  ],
})
export class ApplicationModule {}

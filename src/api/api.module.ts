import { Module } from '@nestjs/common';

import { ApplicationModule } from '../application/application.module';

import { RegisterAction } from './actions/register.action';
import { LoginAction } from './actions/login.action';
import { CreateUserAction } from './actions/create-user.action';
import { UpdateUserAction } from './actions/update-user.action';
import { FindUsersAction } from './actions/find-users.action';
import { AddImageAction } from './actions/add-image.action';

@Module({
  imports: [ApplicationModule],
  controllers: [
    RegisterAction,
    LoginAction,
    CreateUserAction,
    UpdateUserAction,
    FindUsersAction,
    AddImageAction,
  ],
})
export class ApiModule {}

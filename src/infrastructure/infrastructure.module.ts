import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongooseConnection } from './persistence/connections/mongoose.connection';
import { MongoUserRepository } from './persistence/repositories/mongo-user.repository';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: () => {
        return MongooseConnection.create();
      },
    }),
  ],
  providers: [
    {
      provide: 'UserRepository',
      useClass: MongoUserRepository,
    },
  ],
  exports: [
    {
      provide: 'UserRepository',
      useClass: MongoUserRepository,
    },
  ],
})
export class InfrastructureModule {}

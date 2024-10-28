import { Module } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { MongooseConnection } from './persistence/connections/mongoose.connection';
import { MongoUserRepository } from './persistence/repositories/mongo-user.repository';
import { MongoMovieRepository } from './persistence/repositories/mongo-movie.repository';

import { MoviesSyncController } from './adapters/sync-movie.adapter';
import { MovieSyncService } from './services/sync-movie.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: () => {
        return MongooseConnection.create();
      },
    }),
  ],
  controllers: [MoviesSyncController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: MongoUserRepository,
    },
    {
      provide: 'MovieRepository',
      useClass: MongoMovieRepository,
    },
    MovieSyncService,
    {
      provide: 'MovieRepository',
      useClass: MongoMovieRepository,
    },
    // JwtService,
  ],
  exports: [
    {
      provide: 'UserRepository',
      useClass: MongoUserRepository,
    },
    {
      provide: 'MovieRepository',
      useClass: MongoMovieRepository,
    },
  ],
})
export class InfrastructureModule {}

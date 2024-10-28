import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtService } from '@nestjs/jwt';

import { InfrastructureModule } from '../infrastructure/infrastructure.module';

import { LoginHandler } from './commands/login.handler';
import { CreateUserHandler } from './commands/create-user.handler';

import { FindMoviesHandler } from './commands/find-movies.handler';
import { FindMovieHandler } from './commands/find-movie.handler';
import { CreateMovieHandler } from './commands/create-movie.handler';
import { UpdateMovieHandler } from './commands/update-movie.handler';
import { DeleteMovieHandler } from './commands/delete-movie.handler';

@Module({
  imports: [InfrastructureModule, ScheduleModule.forRoot()],
  providers: [
    LoginHandler,
    JwtService,
    CreateUserHandler,
    FindMoviesHandler,
    FindMovieHandler,
    CreateMovieHandler,
    UpdateMovieHandler,
    DeleteMovieHandler,
  ],
  exports: [
    LoginHandler,
    CreateUserHandler,
    FindMoviesHandler,
    FindMovieHandler,
    CreateMovieHandler,
    UpdateMovieHandler,
    DeleteMovieHandler,
  ],
})
export class ApplicationModule {}

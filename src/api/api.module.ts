import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ApplicationModule } from '../application/application.module';

import { AuthActions } from './actions/auth.actions';
import { MovieActions } from './actions/movie.actions';

@Module({
  imports: [ApplicationModule],
  controllers: [AuthActions, MovieActions],
  providers: [JwtService],
})
export class ApiModule {}

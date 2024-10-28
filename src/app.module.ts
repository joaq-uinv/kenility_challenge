import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ApiModule } from './api/api.module';

import { UserMiddleware } from './middleware/user.auth.middleware';
import { AdminMiddleware } from './middleware/admin.auth.middleware';

@Module({
  imports: [ApiModule],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).exclude('auth/(.*)').forRoutes(
      {
        path: 'movies',
        method: RequestMethod.GET,
      },
      {
        path: 'movies/:id',
        method: RequestMethod.GET,
      },
    );

    consumer.apply(AdminMiddleware).exclude('auth/(.*)').forRoutes(
      {
        path: 'movies',
        method: RequestMethod.POST,
      },
      {
        path: 'movies/:id',
        method: RequestMethod.PUT,
      },
      {
        path: 'movies/:id',
        method: RequestMethod.DELETE,
      },
      'movies/sync',
    );
  }
}

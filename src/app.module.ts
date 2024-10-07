import { Module, MiddlewareConsumer } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ApiModule } from './api/api.module';

import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [ApiModule],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/(.*)').forRoutes('*');
  }
}

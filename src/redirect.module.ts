import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RedirectMiddleware } from './redirect.middleware';

@Module({})
export class RedirectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RedirectMiddleware).forRoutes('*');
  }
}

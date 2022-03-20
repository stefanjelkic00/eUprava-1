import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { join } from 'path';
import { MongoServerExceptionFilter } from './api/shared/exception/MongoServerExceptionFilter';
import { MongoValidationErrorFilter } from './api/shared/exception/MongoValidationErrorFilter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['OPTION', 'HEAD', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });
  app.useGlobalFilters(
    new MongoServerExceptionFilter(),
    new MongoValidationErrorFilter(),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
      },
    }),
  );

  await app.listen(3101);
}

bootstrap();

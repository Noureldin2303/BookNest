import helmet from 'helmet';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import configurations from 'config/configurations';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.use(
    helmet({
      contentSecurityPolicy: true,
      frameguard: { action: 'sameorigin' },
      originAgentCluster: true,
    }),
  );

  app.use(cookieParser());
  app.use(
    session({
      secret: configurations().session.secret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  const port = configurations().port;
  await app.listen(port || 3000);
  console.log(`Application is running on: ${port}`);
}
bootstrap();

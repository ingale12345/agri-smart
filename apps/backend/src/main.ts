import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(helmet());
  app.use(cors.default({ origin: '*' }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = config.get('PORT') || 3000;
  await app.listen(port);
  console.log(`🚀 Backend is running on http://localhost:${port}`);
}

bootstrap();

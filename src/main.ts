import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  let port = 3080;
  port = (process.env.port) ? parseInt(process.env.port) : port;
  await app.listen(port);
}
bootstrap();

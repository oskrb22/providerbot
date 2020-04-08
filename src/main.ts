import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  let port = 3080;
  port = (process.env.port) ? parseInt(process.env.port) : port;
  await app.listen(port);
}

async function rabbitMQBootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqp://kxsfcakg:jahgl20UG_mvcXK9f7keJpazfDSJtarc@prawn.rmq.cloudamqp.com/kxsfcakg'
      ],
      queue: 'rabbit-mq-offer',
      // false = manual acknowledgement; true = automatic acknowledgment
      noAck: false,      
    }
  });
  await app.listenAsync();
}

bootstrap();
rabbitMQBootstrap();

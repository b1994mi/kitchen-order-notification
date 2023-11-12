import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqService } from '@app/common';
import { ORDER_CONSUMER } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(ORDER_CONSUMER));
  app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();

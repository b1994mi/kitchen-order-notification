import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { RmqService } from '@app/common';
import { ORDER_NOTIFICATION } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(ORDER_NOTIFICATION));
  await app.startAllMicroservices();
}
bootstrap();

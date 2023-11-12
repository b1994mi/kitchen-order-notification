import { NestFactory } from '@nestjs/core';
import { KitchenModule } from './kitchen.module';
import { RmqService } from '@app/common';
import { ORDER_KITCHEN } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(KitchenModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(ORDER_KITCHEN));
  await app.startAllMicroservices();
}
bootstrap();

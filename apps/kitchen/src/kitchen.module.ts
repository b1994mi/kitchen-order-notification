import { Module } from '@nestjs/common';
import { KitchenController } from './kitchen.controller';
import { KitchenService } from './kitchen.service';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { ORDER_CONSUMER } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RmqModule,
    RmqModule.register({
      name: ORDER_CONSUMER,
    }),
  ],
  controllers: [KitchenController],
  providers: [KitchenService],
})
export class KitchenModule {}

import { ORDER_KITCHEN, ORDER_NOTIFICATION } from './constants';
import { TormModule } from '@app/common/torm.module';
import { Order } from '@app/common/order.entity';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TormModule.register(),
    TypeOrmModule.forFeature([Order]),
    RmqModule,
    RmqModule.register({
      name: ORDER_KITCHEN,
    }),
    RmqModule.register({
      name: ORDER_NOTIFICATION,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateOrderDto } from './order.dto';
import { AppService } from './app.service';
import { RmqService } from '@app/common';
import { Order } from '@app/common/order.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('order')
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.appService.createOrder(createOrderDto);
  }

  @EventPattern('order.finishedProcess')
  async changeOrderStatus(@Payload() data: any, @Ctx() context: RmqContext) {
    this.appService.changeOrderStatus(data?.id);
    this.rmqService.ack(context);
    return;
  }
}

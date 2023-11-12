import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { BadRequestErr, NotFoundErr, RmqService } from '@app/common';
import { Order } from '@app/common/order.entity';
import { CreateOrderDto } from './order.dto';
import { AppService } from './app.service';
import { Response } from 'express';

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

  @Get('order/:id')
  async getOrderDetail(@Res() res: Response, @Param() params: any) {
    const order = await this.appService.getOrderDetail(+params?.id);
    switch (order.constructor) {
      case BadRequestErr:
        res.status(400).send();
        break;
      case NotFoundErr:
        res.status(404).send();
        break;
      default:
        res.json(order);
        break;
    }

    return;
  }

  @Get('food')
  getFoodList(): Promise<any> {
    return this.appService.getFoodList();
  }
}

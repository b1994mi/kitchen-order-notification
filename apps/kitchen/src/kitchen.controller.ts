import { Controller, Get } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { RmqService } from '@app/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class KitchenController {
  constructor(
    private readonly kitchenService: KitchenService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.kitchenService.getHello();
  }

  @EventPattern('order.process')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.kitchenService.processOrder(data);
    this.rmqService.ack(context);
  }
}

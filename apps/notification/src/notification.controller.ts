import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { Controller, Get } from '@nestjs/common';
import { RmqService } from '@app/common';

@Controller()
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.notificationService.getHello();
  }

  @EventPattern('order.confirmation')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.notificationService.notifyOrder(data);
    this.rmqService.ack(context);
  }
}

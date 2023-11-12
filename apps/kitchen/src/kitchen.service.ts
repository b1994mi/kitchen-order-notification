import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_CONSUMER } from './constants';

@Injectable()
export class KitchenService {
  private readonly logger = new Logger(KitchenService.name);

  constructor(
    @Inject(ORDER_CONSUMER) private orderConsumerClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async processOrder(data: any) {
    this.logger.log('Processing order in kitchen...');
    // NOTE: a simple sleep to mimic a long process
    await new Promise((r) => setTimeout(r, 10000));
    this.logger.log('DONE in kitchen:', data);
    this.logger.log('emitting new message');
    this.orderConsumerClient.emit('order.finishedProcess', { id: data?.id });
    this.logger.log(`DONE emit order.finishedProcess for id ${data?.id}`);
  }
}

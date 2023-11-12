import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  getHello(): string {
    return 'Hello World!';
  }

  async notifyOrder(data: any) {
    this.logger.log('Notifying order...');
    // NOTE: a simple sleep to mimic a long process
    await new Promise((r) => setTimeout(r, 2000));
    this.logger.log('DONE notifying order:', data);
  }
}

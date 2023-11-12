import { ORDER_KITCHEN, ORDER_NOTIFICATION } from './constants';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './order.dto';
import { Order, OrderStatus } from '@app/common/order.entity';
import { Food } from '@app/common/food.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private dataSource: DataSource,
    @Inject(ORDER_KITCHEN) private orderKitchenClient: ClientProxy,
    @Inject(ORDER_NOTIFICATION) private orderNotificationClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const foods: Food[] = [];
    for (let i = 0; i < createOrderDto.foods.length; i++) {
      const e = createOrderDto.foods[i];
      const f = new Food();
      f.id = e;

      foods.push(f);
    }

    const order = new Order();
    order.name = createOrderDto.name;
    order.custEmail = createOrderDto.custEmail;
    order.foods = foods;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(order);
      this.orderKitchenClient.emit('order.process', order);
      this.orderNotificationClient.emit('order.confirmation', order);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return order;
  }

  async changeOrderStatus(id: number) {
    this.logger.log(`got message to change order status of id ${id}`);
    const o = await this.ordersRepository.findOne({
      where: { id },
    });
    o.status = OrderStatus.PROCESSED;

    await this.ordersRepository.save(o);
    return;
  }
}

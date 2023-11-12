import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Food } from './food.entity';

export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSED = 'Processed',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Food)
  @JoinTable()
  foods: Food[];

  @Column()
  custEmail: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: string;
}

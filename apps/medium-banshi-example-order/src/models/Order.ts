import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IOrder } from '@medium-banshi-example/convention';

@Entity()
class Order implements IOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    userId: number;

    @Column()
    item: string;

    @Column()
    price: number;
}

export default Order;

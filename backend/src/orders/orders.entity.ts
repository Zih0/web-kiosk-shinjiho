import { OrderToProduct } from 'src/order-to-product/order-to-product.entity'

import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PaymentMethodEnum } from './orders.enum'

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'enum', enum: PaymentMethodEnum })
  payment_method: PaymentMethodEnum

  @Column()
  paid_amount: number

  @Column()
  total_amount: number

  @CreateDateColumn()
  paid_date: Date

  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.order)
  orderToProducts: OrderToProduct[]
}

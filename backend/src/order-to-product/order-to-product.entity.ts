import { Order } from 'src/orders/orders.entity'
import { Product } from 'src/products/entities/products.entity'
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class OrderToProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  count: number

  @Column()
  order_id: number

  @Column()
  product_id: number

  @ManyToOne(() => Order, (order) => order.orderToProducts)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @ManyToOne(() => Product, (product) => product.orderToProducts)
  @JoinColumn({ name: 'product_id' })
  product: Product
}

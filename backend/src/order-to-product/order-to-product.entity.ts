import { Order } from 'src/orders/orders.entity'
import { Product } from 'src/products/products.entity'
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class OrderToProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  count: number

  @ManyToOne(() => Order, (order) => order.orderToProducts)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @ManyToOne(() => Product, (product) => product.orderToProducts)
  @JoinColumn({ name: 'product_id' })
  product: Product
}

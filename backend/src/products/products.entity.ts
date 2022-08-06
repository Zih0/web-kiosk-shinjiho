import { Category } from 'src/categories/categories.entity'
import { OrderToProduct } from 'src/order-to-product/order-to-product.entity'
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  kr_name: string

  @Column()
  en_name: string

  @Column()
  price: number

  @Column()
  thumbnail: string

  @Column()
  option: string

  @Column({
    default: false,
  })
  is_famous: boolean

  @Column({
    default: false,
  })
  is_soldout: boolean

  @Column()
  category_id: number

  @ManyToOne(() => Category, (category) => category.products, { eager: false })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.product)
  orderToProducts: OrderToProduct[]
}

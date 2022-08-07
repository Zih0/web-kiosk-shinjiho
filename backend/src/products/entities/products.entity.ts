import { Category } from 'src/categories/categories.entity'
import { ProductOption } from './product-option.entity'
import { OrderToProduct } from 'src/order-to-product/order-to-product.entity'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

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

  @ManyToMany(() => ProductOption, { eager: true })
  @JoinTable({
    name: 'product_to_option',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'option_id', referencedColumnName: 'id' },
  })
  options: ProductOption[]

  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.product)
  orderToProducts: OrderToProduct[]
}

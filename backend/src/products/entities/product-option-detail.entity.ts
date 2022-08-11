import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductOption } from './product-option.entity'

@Entity('product_option_detail')
export class ProductOptionDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  kr_name: string

  @Column()
  en_name: string

  @Column({
    default: 0,
  })
  price: number

  @Column()
  option_id: number

  @ManyToOne(() => ProductOption, (productOption) => productOption.option_details, { eager: false })
  @JoinColumn({ name: 'option_id' })
  option: ProductOption
}

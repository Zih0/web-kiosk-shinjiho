import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductOption } from './product-option.entity'

@Entity()
export class ProductOptionDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  kr_name: string

  @Column()
  en_name: string

  @Column()
  price: number

  @Column()
  option_id: number

  @ManyToOne(() => ProductOption, (productOption) => productOption.optionDetails)
  @JoinColumn({ name: 'option_id' })
  option: ProductOption
}

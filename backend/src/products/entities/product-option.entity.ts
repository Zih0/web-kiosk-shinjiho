import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProductOptionDetail } from './product-option-detail.entity'

@Entity()
export class ProductOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  kr_name: string

  @Column()
  en_name: string

  @Column()
  option_id: string

  @OneToMany(() => ProductOptionDetail, (productOptionDetail) => productOptionDetail.option, { eager: true })
  @JoinColumn({ name: 'option_id' })
  optionDetails: ProductOptionDetail[]
}

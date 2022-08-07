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

  @Column({
    default: false,
  })
  isRequired: boolean

  @OneToMany(() => ProductOptionDetail, (productOptionDetail) => productOptionDetail.option, { eager: true })
  optionDetails: ProductOptionDetail[]
}

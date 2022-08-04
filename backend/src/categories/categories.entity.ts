import { Product } from 'src/products/products.entity'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  kr_name: string

  @Column()
  en_name: string

  @OneToMany(() => Product, (product) => product.category, { eager: true })
  products: Product[]
}

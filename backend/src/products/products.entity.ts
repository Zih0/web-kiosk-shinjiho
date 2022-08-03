import { Category } from 'src/categories/categories.entity'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

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

  @ManyToOne((type) => Category, (category) => category.products, { eager: false })
  category: Category
}

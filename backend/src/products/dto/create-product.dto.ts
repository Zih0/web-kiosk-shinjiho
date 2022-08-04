import { Category } from 'src/categories/categories.entity'

export class CreateProductRequestDto {
  public kr_name: string
  public en_name: string
  public price: number
  public thumbnail: string
  public category: Category
}

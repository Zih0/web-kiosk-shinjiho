export class CreateProductDto {
  public kr_name: string
  public en_name: string
  public price: number
  public thumbnail: string
  public category_id: number
}

export class CreateProductRequestDto extends CreateProductDto {
  public options: number[]
}

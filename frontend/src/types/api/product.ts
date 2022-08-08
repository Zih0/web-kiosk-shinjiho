export interface ProductOptionDetailType {
  id: number
  kr_name: string
  en_name: string
  price: number
}
export interface ProductOptionType {
  id: number
  kr_name: string
  en_name: string
  is_required: boolean
  option_details: ProductOptionDetailType[]
}

export interface ProductType {
  id: number
  kr_name: string
  en_name: string
  price: number
  thumbnail: string
  options: ProductOptionType[]
  is_famous: boolean
  is_soldout: boolean
}

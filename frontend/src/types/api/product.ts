export interface ProductType {
  id: number
  kr_name: string
  en_name: string
  price: number
  thumbnail: string
  option: Record<string, any[]>
  is_famous: boolean
  is_soldout: boolean
}

import axios from 'axios'
import { ProductType } from 'src/types/api/product'

export const getProductsAPI = async (categoryId: number): Promise<ProductType[]> => {
  const { data } = await axios.get(`/products/${categoryId}`)

  return data
}

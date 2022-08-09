import axios from 'axios'

import { CategoryType } from 'src/types/api/category'

export const getCategoriesAPI = async (): Promise<CategoryType[]> => {
  const { data } = await axios.get('/categories')

  return data
}

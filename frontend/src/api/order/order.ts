import axios from 'axios'

import { OrderMenuType, OrderReceiptType } from 'src/types/api/order'

export const orderMenu = async ({
  paymentMethod,
  paidAmount,
  totalAmount,
  products,
}: OrderMenuType): Promise<OrderReceiptType> => {
  const { data } = await axios.post('/orders', {
    payment_method: paymentMethod,
    paid_amount: paidAmount,
    total_amount: totalAmount,
    products,
  })

  return data
}

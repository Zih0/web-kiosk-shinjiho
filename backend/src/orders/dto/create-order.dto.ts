import { PaymentMethodEnum } from '../orders.enum'

export class OrdersProduct {
  product_id: number
  count: number
}

export class CreateOrderRequestDto {
  payment_method: PaymentMethodEnum
  paid_amount: number
  total_amount: number
  products: OrdersProduct[]
}

export class CreateOrderResponseDto {
  payment_method: PaymentMethodEnum
  paid_amount: number
  total_amount: number
  order_number: number
}

export type PaymentMethodType = 'cash' | 'credit_card'

export interface OrdersProductType {
  product_id: number
  count: number
}

export interface OrderMenuType {
  paymentMethod: PaymentMethodType
  paidAmount: number
  totalAmount: number
  products: OrdersProductType[]
}

export interface OrderReceiptType {
  payment_method: PaymentMethodType
  paid_amount: number
  total_amount: number
  order_number: number
}

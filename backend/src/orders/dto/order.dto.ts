import * as Joi from 'joi'
import { PaymentMethodEnum } from '../orders.enum'

export const OrderSchema = Joi.object({
  payment_method: Joi.string()
    .valid(...Object.values(PaymentMethodEnum))
    .required(),
  paid_amount: Joi.number().required(),
  total_amount: Joi.number().required(),
  products: Joi.array().required(),
}).options({ abortEarly: false })

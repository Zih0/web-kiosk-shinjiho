import * as Joi from 'joi'

export const OptionDetailSchema = Joi.object({
  kr_name: Joi.string().max(20).required(),
  en_name: Joi.string().max(40).required(),
  option_id: Joi.number().required(),
  price: Joi.number(),
}).options({ abortEarly: false })

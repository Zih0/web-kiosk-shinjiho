import * as Joi from 'joi'

export const ProductSchema = Joi.object({
  kr_name: Joi.string().max(20).required(),
  en_name: Joi.string().max(40).required(),
  price: Joi.number().required(),
  thumbnail: Joi.string().required(),
  category_id: Joi.number().required(),
  options: Joi.array(),
}).options({ abortEarly: false })

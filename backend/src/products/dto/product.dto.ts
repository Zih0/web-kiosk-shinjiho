import * as Joi from 'joi'

export const ProductSchema = Joi.object({
  kr_name: Joi.string().max(20).required(),
  en_name: Joi.string().max(40).required(),
  price: Joi.number().required(),
  option: Joi.string(),
  thumbnail: Joi.string().required(),
  category: Joi.number().required(),
}).options({ abortEarly: false })

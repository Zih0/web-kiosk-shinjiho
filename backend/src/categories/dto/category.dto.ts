import * as Joi from 'joi'

export const CategorySchema = Joi.object({
  kr_name: Joi.string().max(20).required(),
  en_name: Joi.string().max(40).required(),
}).options({ abortEarly: false })

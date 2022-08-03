import * as Joi from 'joi'

export const CategorySchema = Joi.object({
  kr_name: Joi.string().required(),
  en_name: Joi.string().required(),
}).options({ abortEarly: false })

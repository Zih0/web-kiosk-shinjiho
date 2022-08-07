import * as Joi from 'joi'

export const OptionSchema = Joi.object({
  kr_name: Joi.string().max(20).required(),
  en_name: Joi.string().max(40).required(),
  is_required: Joi.boolean(),
}).options({ abortEarly: false })

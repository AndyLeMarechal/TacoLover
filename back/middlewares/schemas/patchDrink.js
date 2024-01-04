import Joi from "joi";

export default Joi.object({
  soft: Joi.boolean(),

  title: Joi.string()
    .min(3)
    .max(40)
    .required(),

  price_in_euro: Joi.number()
    .min(1)
    .max(4)
    .required(),

  img: Joi.string().empty('').dataUri()
});
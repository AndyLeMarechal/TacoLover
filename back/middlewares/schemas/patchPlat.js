import Joi from "joi";

export default Joi.object({
  description: Joi.string()
    .min(3)
    .max(200)
    .required(),

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
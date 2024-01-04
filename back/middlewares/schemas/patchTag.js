import Joi from "joi";

export default Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(40)
    .required(),

  color: Joi.string()
    .hex()
});
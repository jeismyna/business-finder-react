import Joi from "joi";

const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|\/(?:[\w-]+\/)*[\w-]+\.(?:jpg|jpeg|png|gif|bmp|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv|html|htm|js|css))/;
const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const cardSchema = {
  title: Joi.string().min(2).max(50).required(),
  subtitle: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(500).required(),
  phone: Joi.string()
    .ruleset.regex(phoneRegex)
    .rule({ message: 'card "phone" must be a valid phone number' })
    .required(),
  email: Joi.string().max(350)
    .ruleset.pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .rule({ message: 'card "email" must be a valid mail' })
    .required(),
  webUrl: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({ message: 'card "web" must be a valid url' })
    .allow(""),
  imageUrl: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({ message: 'card "image url" must be a valid url' })
    .allow(""),
  imageAlt: Joi.string().min(2).max(50).allow(""),
  state: Joi.string().max(50).allow(""),
  country: Joi.string().min(2).max(200).required(),
  city: Joi.string().min(2).max(200).required(),
  street: Joi.string().min(2).max(150).required(),
  houseNumber: Joi.number().required(),
  zip: Joi.number(),
};

export default cardSchema;

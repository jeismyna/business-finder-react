import Joi from "joi";

const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|\/(?:[\w-]+\/)*[\w-]+\.(?:jpg|jpeg|png|gif|bmp|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv|html|htm|js|css))/;
const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const signupSchema = {
  first: Joi.string().min(2).max(256).required(),
  middle: Joi.string().min(2).max(256).allow(""),
  last: Joi.string().min(2).max(256).required(),
  phone: Joi.string()
    .ruleset.regex(phoneRegex)
    .rule({ message: 'user "phone" must be a valid phone number' })
    .required(),
  email: Joi.string().max(350)
    .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .rule({ message: 'user "mail" must be a valid mail' })
    .required(),
  password: Joi.string().max(256)
    .ruleset.regex(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
    )
    .rule({
      message:
        'user "password" must be at least seven characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-',
    })
    .required(),
  url: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({ message: "user image must be a valid url" })
    .allow(""),
  alt: Joi.string().min(2).max(50).allow(""),
  state: Joi.string().min(2).max(50).allow(""),
  country: Joi.string().min(2).max(200).required(),
  city: Joi.string().min(2).max(200).required(),
  street: Joi.string().min(2).max(150).required(),
  houseNumber: Joi.number().required(),
  zip: Joi.number(),
  isBusiness: Joi.boolean().required(),
};

export default signupSchema;

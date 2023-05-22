const Joi = require("joi");
const getError = require("../utilities/validationError");

const schema = {
  add: Joi.object({
    category: Joi.string()
      .valid("sell", "lost/found", "In good hands")
      .required(),
    title: Joi.string().min(2).max(120).required(),
    birthday: Joi.string().pattern(/^\d{2}\.\d{2}\.\d{4}$/),
    name: Joi.string().min(2).max(16).required(),
    breed: Joi.string().min(2).max(16).required(),
    sex: Joi.string().valid("male", "female").required(),
    location: Joi.string()
      .pattern(/^[A-Za-z ]+$/)
      .min(2)
      .max(16)
      .when("category", {
        is: Joi.valid("sell", "lost/found", "In good hands"),
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    price: Joi.number()
      .min(0)
      .when("category", {
        is: "sell",
        then: Joi.number().min(1).required(),
        otherwise: Joi.optional(),
      }),
    comments: Joi.string()
      .min(8)
      .max(256)
      .regex(/^[\s\S]*.*[^\s][\s\S]*$/),
  }),
  getCategory: Joi.object({
    category: Joi.string()
      .valid("sell", "lost-found", "for-free", "favorite", "own")
      .required(),
    search: Joi.string().min(3).max(30),
    page: Joi.string().min(1).max(4),
    perpage: Joi.string().min(1).max(3),
    age: Joi.string().valid("1", "2", "3-12").when(Joi.exist(), {
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    gender: Joi.string().valid("female", "male").when(Joi.exist(), {
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
  }).or("category", "search", "page", "perpage", "age", "gender"),
};

const addNoticeValidation = ({ body }, res, next) => {
  const { error } = schema.add.validate(body, { abortEarly: false });
  if (error) return res.status(400).json({ message: getError(error, "add") });

  next();
};

const getNoticeCategoryValidation = ({ query, params }, res, next) => {
  const { error } = schema.getCategory.validate({ ...query, ...params });
  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
  next();
};

module.exports = { addNoticeValidation, getNoticeCategoryValidation };
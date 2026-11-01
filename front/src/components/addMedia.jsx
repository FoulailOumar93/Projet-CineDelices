import Joi from 'joi';

export const mediaCreateSchema = Joi.object({
  title: Joi.string()
    .max(50)
    .required()
    .messages({
      'string.empty': 'Le titre est obligatoire',
      'string.max': 'Le titre ne peut pas dépasser 50 caractères',
    }),

  description: Joi.string()
    .required()
    .messages({
      'string.empty': 'La description est obligatoire',
    }),

  category: Joi.string()
    .valid('film', 'série', 'manga', 'animation')
    .required()
    .messages({
      'any.only':
        "La catégorie doit être 'film', 'série', 'manga' ou 'animation'",
      'string.empty': 'La catégorie est obligatoire',
    }),

  release_date: Joi.date()
    .allow(null)
    .optional()
    .messages({
      'date.base': 'La date de sortie doit être valide',
    }),

  end_date: Joi.date()
    .allow(null, '')
    .optional()
    .messages({
      'date.base': 'La date de fin doit être valide',
    }),

  duration: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'La durée doit être un nombre',
      'number.positive': 'La durée doit être positive',
    }),

  seasons: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'Le nombre de saisons doit être un nombre',
      'number.positive': 'Le nombre de saisons doit être positif',
    }),

  country: Joi.string()
    .optional(),

  original_language: Joi.string()
    .optional(),

  recipes: Joi.string()
    .optional(),
});

export const mediaUpdateSchema = Joi.object({
  title: Joi.string()
    .max(50)
    .optional(),

  description: Joi.string()
    .optional(),

  category: Joi.string()
    .valid('film', 'série', 'manga', 'animation')
    .optional(),

  release_date: Joi.date()
    .allow(null, '')
    .optional(),

  end_date: Joi.date()
    .allow(null, '')
    .optional(),

  duration: Joi.number()
    .integer()
    .positive()
    .allow(null, '')
    .optional(),

  seasons: Joi.number()
    .integer()
    .positive()
    .allow(null, '')
    .optional(),

  country: Joi.string()
    .allow('')
    .optional(),

  original_language: Joi.string()
    .allow('')
    .optional(),

  recipes: Joi.string()
    .optional(),
});

export const mediaInRecipeSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required(),
});
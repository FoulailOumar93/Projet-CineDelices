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

  img_url: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'L\'URL de l\'image doit être valide',
    }),

  release_date: Joi.date().allow(null)
    .optional()
    .messages({
      'date.base': 'La date de sortie doit être une date valide',
    }),

  category: Joi.string()
    .valid('film', 'série', 'manga')
    .required()
    .messages({
      'any.only': 'La catégorie doit être \'film\', \'série\' ou \'manga\'',
      'string.empty': 'La catégorie est obligatoire',
    }),

  is_validated: Joi.boolean()
    .optional(),
});

export const mediaUpdateSchema = Joi.object({
  title: Joi.string()
    .max(50)
    .optional()
    .messages({
      'string.max': 'Le titre ne peut pas dépasser 50 caractères',
    }),
    
  description: Joi.string()
    .optional(),

  release_date: Joi.date()
    .optional()
    .messages({
      'date.base': 'La date de sortie doit être une date valide',
    }),

  category: Joi.string()
    .valid('film', 'série', 'manga')
    .optional()
    .messages({
      'any.only': 'La catégorie doit être \'film\', \'série\' ou \'manga\'',
    }),
  
  is_validated: Joi.boolean()
    .optional(),

});

// media-in-recipe.schema.js

export const mediaInRecipeSchema = Joi.object({
  id: Joi.number().integer().positive(),  // only need the ID to link
});

import Joi from 'joi';

/* =========================
   INGREDIENT IN RECIPE
========================= */
export const ingredientInRecipeSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  quantity: Joi.alternatives()
    .try(Joi.number(), Joi.string())
    .optional()
    .allow('', null),
  unit: Joi.string().optional().allow('', null),
});

/* =========================
   MEDIA IN RECIPE
========================= */
export const mediaInRecipeSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

/* =========================
   CREATE RECIPE
========================= */
export const recipeCreateSchema = Joi.object({
  title: Joi.string().max(100).required(),
  instructions: Joi.string().required(),
  time: Joi.number().integer().positive().optional(),
  difficulty: Joi.number().integer().min(1).max(5).optional(),
  category: Joi.string().valid('starter', 'main', 'dessert').required(),

  ingredients: Joi.array()
    .items(ingredientInRecipeSchema)
    .min(1)
    .required(),

  media_id: Joi.number().integer().positive().optional(),
});

/* =========================
   UPDATE RECIPE
========================= */
export const recipeUpdateSchema = Joi.object({
  title: Joi.string().max(100).optional(),
  instructions: Joi.string().optional(),
  time: Joi.number().integer().positive().optional(),
  difficulty: Joi.number().integer().min(1).max(5).optional(),
  category: Joi.string().valid('starter', 'main', 'dessert').optional(),

  ingredients: Joi.array()
    .items(ingredientInRecipeSchema)
    .optional(),

  media_id: Joi.number().integer().positive().optional(),
  is_validated: Joi.boolean().optional(),
});

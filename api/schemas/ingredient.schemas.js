import Joi from 'joi';

// putting an ingredient in the base ingredient table
export const ingredientCreateSchema = Joi.object({
  name: Joi.string().max(25).required(),
  culinary_profile: Joi.string().valid('viande','poisson','végétarien','sucré','salé','amer').required(),
});

// updating an ingredient in the base ingredient table
export const ingredientUpdateSchema = Joi.object({
  name: Joi.string().max(25).optional(),
  culinary_profile: Joi.string().valid('viande','poisson','végétarien','sucré','salé','amer').optional(),
  is_validated: Joi.boolean().optional(),
  validated_by: Joi.number().integer().positive().optional(),
});

// Validation schema for RECIPE HAS INGREDIENT
export const ingredientInRecipeSchema = Joi.object({
  id: Joi.number().integer().positive().required(), // must match an existing ingredient id
  quantity: Joi.number().positive().required(),     // cannot be zero or negative
  unit: Joi.string().max(25).optional().allow(null, ''),           // unit of measurement
});
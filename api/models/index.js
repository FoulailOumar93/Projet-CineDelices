import { sequelize } from '../sequelize.client.js';

import { Recipe } from './recipe.model.js';
import { Media } from './media.model.js';
import { Ingredient } from './ingredient.model.js';
import { RecipeSeenIn } from './recipe_seen_in.model.js';
import { RecipeHasIngredient } from './recipe_has_ingredient.model.js';

/* =========================
   ASSOCIATIONS
========================= */

/* =========================
   RECIPES ↔ INGREDIENTS
========================= */

// Côté Recipe → Ingredients
Recipe.belongsToMany(Ingredient, {
  through: RecipeHasIngredient,
  foreignKey: 'recipe_id',
  otherKey: 'ingredient_id',
  as: 'ingredients',
});

// ⚠️ ALIAS UNIQUE ICI (PAS "recipes")
Ingredient.belongsToMany(Recipe, {
  through: RecipeHasIngredient,
  foreignKey: 'ingredient_id',
  otherKey: 'recipe_id',
  as: 'used_in_recipes',
});

/* =========================
   RECIPES ↔ MEDIAS
========================= */

Recipe.belongsToMany(Media, {
  through: RecipeSeenIn,
  foreignKey: 'recipe_id',
  otherKey: 'media_id',
  as: 'seen_in_medias',
});

Media.belongsToMany(Recipe, {
  through: RecipeSeenIn,
  foreignKey: 'media_id',
  otherKey: 'recipe_id',
  as: 'seen_in_recipes',
});

/* =========================
   EXPORTS
========================= */
export {
  sequelize,
  Recipe,
  Media,
  Ingredient,
  RecipeSeenIn,
  RecipeHasIngredient,
};

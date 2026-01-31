import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.client.js';
import { Recipe } from './recipe.model.js';
import { RecipeHasIngredient } from './recipe_has_ingredient.model.js';

export class Ingredient extends Model {}

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    culinary_profile: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'neutre',
    },

    is_validated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    validated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Ingredient',
    tableName: 'ingredients',
    underscored: true,
    timestamps: true,
  },
);

/* =========================
   ASSOCIATIONS
========================= */

// 🔗 Ingredient ↔ Recipe (N–N)
Ingredient.belongsToMany(Recipe, {
  through: RecipeHasIngredient,
  as: 'recipes',
  foreignKey: 'ingredient_id',
  otherKey: 'recipe_id',
});

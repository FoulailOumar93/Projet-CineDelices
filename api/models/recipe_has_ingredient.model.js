import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.client.js';

export class RecipeHasIngredient extends Model {}

RecipeHasIngredient.init(
  {
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    ingredient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    quantity: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    unit: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'RecipeHasIngredient',
    tableName: 'recipe_has_ingredient',
    underscored: true,
    timestamps: true,
  },
);
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
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    sequelize,
    modelName: 'RecipeHasIngredient',
    tableName: 'recipe_has_ingredient',
    underscored: true,
    timestamps: false, // 🔥 OBLIGATOIRE
  },
);

import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.client.js';
export const RecipeSeenIn = sequelize.define(
  'RecipeSeenIn',
  {
    recipe_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    media_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: 'recipe_seen_in',
    underscored: true,
    timestamps: true,
  },
);

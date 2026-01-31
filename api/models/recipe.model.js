import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.client.js';

export const Recipe = sequelize.define(
  'Recipe',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    is_validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    // 🔥 OBLIGATOIRE — SINON ERREUR BDD
    validated_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'recipes',
    underscored: true,
    timestamps: true,

    hooks: {
      beforeValidate(recipe) {
        if (recipe.title && !recipe.slug) {
          recipe.slug = recipe.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        }
      },
    },
  },
);

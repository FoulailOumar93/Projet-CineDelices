// api/models/media.model.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.client.js';

export const Media = sequelize.define(
  'Media',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    img_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    release_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    end_date: {
      type: DataTypes.DATE,
      allowNull: true, // ✅ FIN DE DIFFUSION
    },
    /* ✅ NOUVEAUX CHAMPS */
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    original_language: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    category: {
      type: DataTypes.ENUM('film', 'serie', 'manga', 'animation'), // ✅ FIX
      allowNull: false,
    },

    seasons: {
      type: DataTypes.INTEGER,
      allowNull: true, // ✅ NOMBRE DE SAISONS
    },

    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
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

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    tableName: 'media',
    underscored: true,
    timestamps: true,

    hooks: {
      beforeValidate(media) {
        if (media.title && !media.slug) {
          media.slug = media.title
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

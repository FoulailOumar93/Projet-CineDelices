import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize.client.js';

export class Season extends Model {}

Season.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false, // ex: "Saison 1"
    },

    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    release_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    episode_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    media_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'seasons',
    modelName: 'Season',
    timestamps: true,
    underscored: true,
  },
);

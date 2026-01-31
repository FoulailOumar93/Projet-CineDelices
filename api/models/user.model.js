import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.client.js';

export class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      // ✅ aligné avec ton enum postgres : member/admin
      type: DataTypes.ENUM('member', 'admin'),
      allowNull: false,
      defaultValue: 'member',
    },
  },
  {
    sequelize,
    tableName: 'users',
    underscored: true,
  },
);

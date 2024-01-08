import { DataTypes, Model } from 'sequelize';
import { sequelize } from './connectPostgreSQL';
import { CarInterface } from '../interfaces/carInterface';

export const Car = sequelize.define<Model<CarInterface>>(
  'cars',
  {
    car_number: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    driver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

import { DataTypes, Model } from 'sequelize';
import { CarInterfaceDB } from '../interfaces/carInterface';
import { sequelize } from './postgreSQLConnect';

export const Car = sequelize.define<Model<CarInterfaceDB>>(
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

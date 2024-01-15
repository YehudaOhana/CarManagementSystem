import { CarInterface } from '../interfaces/carInterface';
import {
  addNewCarDal,
  deleteCarDal,
  getAllCarsDal,
  getSpecificCarDal,
  updateCarStatusDal,
} from './carsDalPostgreSQL';
import {
  deleteCarRedis,
  getSpecificCarRedis,
  updateCarStatusRedis,
} from './carsDalRedis';
import chalk from 'chalk';

export const getAllCarsService = async () => {
  const allCars = getAllCarsDal();
  return allCars;
};

export const getSpecificCarService = async (carNumber: string) => {
  const specificCarDB = await getSpecificCarDal(carNumber).then((data) => {
    console.log(chalk.blue('SourceSpecificCar: DB'));
    return data;
  });
  const specificCarRedis = await getSpecificCarRedis(carNumber).then((data) => {
    console.log(chalk.magenta('SourceSpecificCar: Redis'));
    return data;
  });
  return await Promise.any([specificCarDB, specificCarRedis]);
};

export const addNewCarService = async (newCar: CarInterface) => {
  const addedCar = await addNewCarDal(newCar);
  return addedCar;
};

export const deleteCarService = async (carNumber: string) => {
  const deletedCarDB = await deleteCarDal(carNumber);
  const deletedCarRedis = await deleteCarRedis(carNumber);
  return { DB: deletedCarDB, Redis: deletedCarRedis };
};

export const updateCarStatusService = async (
  carNumber: string,
  newStatus: string
) => {
  const updatedCarStatusDB = await updateCarStatusDal(carNumber, newStatus);
  const updatedCarStatusRedis = await updateCarStatusRedis(
    carNumber,
    newStatus
  );
  return { DB: updatedCarStatusDB, Redis: updatedCarStatusRedis };
};

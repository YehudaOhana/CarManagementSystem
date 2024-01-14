import { CarInterface } from '../interfaces/carInterface';
import {
  addNewCarDal,
  deleteCarDal,
  getAllCarsDal,
  getSpecificCarDal,
  updateCarStatusDal,
} from './carsDalPostgreSQL';
import {
  addNewCarRedis,
  deleteCarRedis,
  getAllDataRedis,
  getSpecificCarRedis,
  updateCarStatusRedis,
} from './carsDalRedis';
import chalk from 'chalk';

export const getAllCarsService = async () => {
  const carsFromDB = getAllCarsDal().then((data) => {
    console.log(chalk.blue('Source: DB'));
    return data;
  });
  const carsFromRedis = getAllDataRedis().then((data) => {
    console.log(chalk.magenta('Source: Redis'));
    return data;
  });
  return await Promise.any([carsFromDB, carsFromRedis]);
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
  const addedCarDB = await addNewCarDal(newCar);
  const addedCarRedis = await addNewCarRedis(newCar);
  return { DB: addedCarDB, Redis: addedCarRedis };
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

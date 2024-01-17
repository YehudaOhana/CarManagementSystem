import { CarInterface, newStatusInterface } from '../interfaces/carInterface';
import { checkToken } from '../tokenConection';
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

export const getAllCarsService = async (token: string) => {
  try {
    checkToken(token);
    const allCars = getAllCarsDal(token);
    return allCars;
  } catch (error) {
    console.error(error);
  }
};

export const getSpecificCarService = async (
  carNumber: string,
  token: string
) => {
  try {
    checkToken(token);
    const specificCarDB = await getSpecificCarDal(carNumber, token).then(
      (data) => {
        console.log(chalk.blue('SourceSpecificCar: DB'));
        return data;
      }
    );
    const specificCarRedis = await getSpecificCarRedis(carNumber, token).then(
      (data) => {
        console.log(chalk.magenta('SourceSpecificCar: Redis'));
        return data;
      }
    );
    return await Promise.any([specificCarDB, specificCarRedis]);
  } catch (error) {
    console.error(error);
  }
};

export const addNewCarService = async (token: string, newCar: CarInterface) => {
  const addedCar = await addNewCarDal(newCar, token);
  return addedCar;
};

export const deleteCarService = async (carNumber: string, token: string) => {
  const deletedCarDB = await deleteCarDal(carNumber, token);
  const deletedCarRedis = await deleteCarRedis(carNumber, token);
  return { DB: deletedCarDB, Redis: deletedCarRedis };
};
export const updateCarStatusService = async (
  token: string,
  updatedStatus: newStatusInterface
) => {
  const updatedCarStatusDB = await updateCarStatusDal(updatedStatus, token);
  const updatedCarStatusRedis = await updateCarStatusRedis(
    updatedStatus,
    token
  );
  return { DB: updatedCarStatusDB, Redis: updatedCarStatusRedis };
};

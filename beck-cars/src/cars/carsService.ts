import { CarInterface } from '../interfaces/carInterface';
import {
  addNewCarDal,
  deleteCarDal,
  getAllCarsDal,
  getSpecificCarDal,
  updateCarStatusDal,
} from './carsDalPostgreSQL';
// import RedisClient from '../redis/redisCar';

export const getAllCarsService = async () => {
  // const key = `getAllUser:getAllUsersService`;
  // const dataFromRedis = await RedisClient.get(key);
  // if (dataFromRedis) {
  //   console.log('Data retrieved from Redis');
  //   return JSON.parse(dataFromRedis);
  // }
  const cars = await getAllCarsDal();
  // await RedisClient.setEx(key, 200, JSON.stringify(users));
  // console.log('Data stored in Redis');
  return cars;
};

export const getSpecificCarService = async (carNumber: string) => {
  const specificCar = await getSpecificCarDal(carNumber);
  return specificCar;
};

export const addNewCarService = async (newCar: CarInterface) => {
  const addedCar = await addNewCarDal(newCar);
  return addedCar;
};

export const deleteCarService = async (carNumber: string) => {
  const specificCar = await deleteCarDal(carNumber);
  return specificCar;
};

export const updateCarStatusService = async (
  carNumber: string,
  newStatus: string
) => {
  const updatedCarStatus = await updateCarStatusDal(carNumber, newStatus);
  return updatedCarStatus;
};

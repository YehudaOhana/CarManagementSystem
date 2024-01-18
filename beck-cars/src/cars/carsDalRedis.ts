import {
  CarInterface,
  newLocationInterface,
  newStatusInterface,
} from '../interfaces/carInterface';
import { client } from '../redis/connectRedis';
import { getAllCarsDal } from './carsDalPostgreSQL';

export const getSpecificCarRedis = async (carNumber: string, token: string) => {
  const cacheKey = 'specificCarList';
  try {
    const cachedData = await client.get(cacheKey);
    const allCarRedis = cachedData ? JSON.parse(cachedData) : [];
    const specificCarRedis = allCarRedis.find(
      (car) => car.carNumber === carNumber
    );
    if (specificCarRedis) {
      return specificCarRedis;
    }
    const allDataDB = await getAllCarsDal(token);
    const specificCarDB = allDataDB.find((car) => car.carNumber === carNumber);
    if (specificCarDB) {
      allCarRedis.push(specificCarDB);
      await client.set(cacheKey, JSON.stringify(allCarRedis));
    }
    return specificCarDB;
  } catch (error) {
    console.error('Error fetching or updating cache:', error);
    return Promise.reject(error);
  }
};

export const deleteCarRedis = async (carNumber: string, token: string) => {
  const cacheKey = 'specificCarList';
  try {
    const cachedData = await client.get(cacheKey);
    const allCarRedis = cachedData ? JSON.parse(cachedData) : [];
    const updatedData = allCarRedis.filter(
      (car) => car.carNumber !== carNumber
    );
    await client.set(cacheKey, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error deleting car from Redis:', error);
    return Promise.reject(error);
  }
};

export const updateCarStatusRedis = async (
  updatedStatus: newStatusInterface,
  token: string
) => {
  const cacheKey = 'specificCarList';
  try {
    const cachedData = await client.get(cacheKey);
    const allCarRedis = cachedData ? JSON.parse(cachedData) : [];
    const updatedData = allCarRedis.map((car) =>
      car.carNumber === updatedStatus.carNumber
        ? { ...car, status: updatedStatus.newStatus }
        : car
    );
    await client.set(cacheKey, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error updating car status in Redis:', error);
    return Promise.reject(error);
  }
};

export const updateCarLocationRedis = async (
  updatedLocation: newLocationInterface,
  token: string
) => {
  const cacheKey = 'specificCarList';
  try {
    const cachedData = await client.get(cacheKey);
    const allCarRedis = cachedData ? JSON.parse(cachedData) : [];
    const updatedData = allCarRedis.map((car: CarInterface) =>
      car.carNumber === updatedLocation.carNumber
        ? { ...car, status: updatedLocation.newLocation }
        : car
    );
    await client.set(cacheKey, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error updating car status in Redis:', error);
    return Promise.reject(error);
  }
};

import { client } from '../redis/connectRedis';
import { getAllCarsDal } from './carsDalPostgreSQL';

export const getSpecificCarRedis = async (carNumber: string) => {
  const cacheKey = 'getSpecificCar';
  try {
    const cachedData = await client.get(cacheKey);
    const allCarRedis = cachedData ? JSON.parse(cachedData) : [];
    const specificCarRedis = allCarRedis.find(
      (car) => car.carNumber === carNumber
    );
    if (specificCarRedis) {
      return specificCarRedis;
    }
    const allDataDB = await getAllCarsDal();
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

export const deleteCarRedis = async (carNumber) => {
  try {
    const specificCarRedis = await getAllDataRedis();
    const updatedData = allDataRedis.filter(
      (car) => car.carNumber !== carNumber
    );
    await client.set('getAllData', JSON.stringify(updatedData));
    return `Car number '${carNumber}' deleted successfully from Redis!!`;
  } catch (error) {
    console.error('Error deleting car from Redis:', error);
    return Promise.reject(error);
  }
};

export const updateCarStatusRedis = async (carNumber, newStatus) => {
  try {
    const allDataRedis = await getAllDataRedis();
    const updatedData = allDataRedis.map((car) =>
      car.carNumber === carNumber ? { ...car, status: newStatus } : car
    );
    await client.set('getAllData', JSON.stringify(updatedData));
    return `Car number '${carNumber}' status updated to '${newStatus}' successfully in Redis!!`;
  } catch (error) {
    console.error('Error updating car status in Redis:', error);
    return Promise.reject(error);
  }
};

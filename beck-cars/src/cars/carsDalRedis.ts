import { client } from '../redis/connectRedis';
import { getAllCarsDal } from './carsDalPostgreSQL';

export const getAllDataRedis = async () => {
  const cacheKey = 'getAllData';
  const cachedData = await client.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  try {
    const allDataDB = await getAllCarsDal();
    await client.set(cacheKey, JSON.stringify(allDataDB));

    return allDataDB;
  } catch (error) {
    console.error('Error creating new trip and caching in Redis:', error);
    return Promise.reject(error);
  }
};

export const getSpecificCarRedis = async (carNumber: string) => {
  const allDataRedis = await getAllDataRedis();
  const specificCar = allDataRedis.find((car) => car.carNumber === carNumber);
  return {
    carNumber: specificCar.car_number,
    color: specificCar.color,
    driver: specificCar.driver,
    location: specificCar.location,
    model: specificCar.model,
    status: specificCar.status,
  };
};

export const addNewCarRedis = async (newCar) => {
  try {
    const allDataRedis = await getAllDataRedis();
    allDataRedis.push(newCar);
    await client.set('getAllData', JSON.stringify(allDataRedis));
    return newCar;
  } catch (error) {
    console.error('Error adding new car to Redis:', error);
    return Promise.reject(error);
  }
};

export const deleteCarRedis = async (carNumber) => {
  try {
    const allDataRedis = await getAllDataRedis();
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

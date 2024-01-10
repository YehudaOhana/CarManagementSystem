import { z } from 'zod';
import { publicProcedure } from '../tRPC';
import chalk from 'chalk';
import {
  getAllCarsService,
  getSpecificCarService,
  deleteCarService,
  updateCarStatusService,
  addNewCarService,
} from './carsService';

export const getAllCarsController = publicProcedure.query(async () => {
  try {
    return await getAllCarsService();
  } catch (error) {
    return 'Not Data';
  }
});

export const getSpecificCarController = publicProcedure
  .input(z.string())
  .query(async (opts) => {
    try {
      return await getSpecificCarService(opts.input);
    } catch (error) {
      return null;
    }
  });

export const addNewCarController = publicProcedure
  .input(
    z.object({
      carNumber: z.string(),
      model: z.string(),
      color: z.string(),
      status: z.string(),
      driver: z.string(),
      location: z.string(),
    })
  )
  .mutation(async (opts) => {
    try {
      const { carNumber, model, color, status, driver, location } = opts.input;
      // const existingCar = await getSpecificCarService(car_number);
      // if (existingCar) {
      //   throw new Error(`Car with car_number '${car_number}' already exists.`);
      // }
      const addedCar = await addNewCarService({
        carNumber,
        model,
        color,
        status,
        driver,
        location,
      });
      return addedCar;
    } catch (error) {
      console.error('Error in addNewCarService procedure:', error);
      throw error;
    }
  });

export const deleteCarController = publicProcedure
  .input(z.string())
  .mutation(async (opts) => {
    try {
      const deletedCar = await deleteCarService(opts.input);
      return deletedCar;
    } catch (error) {
      console.error('Error in getSpecificCarService procedure:', error);
      throw error;
    }
  });

export const updateCarStatusController = publicProcedure
  .input(
    z.object({
      carNumber: z.string(),
      newStatus: z.string(),
    })
  )
  .mutation(async (opts) => {
    try {
      const updatedCarStatus = await updateCarStatusService(
        opts.input.carNumber,
        opts.input.newStatus
      );
      return updatedCarStatus;
    } catch (error) {
      console.error('Error in updateCarStatusService procedure:', error);
      throw error;
    }
  });

import { z } from 'zod';
import { publicProcedure } from '../tRPC';
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
    console.error('Error in getAllCarsService procedure:', error);
    throw error;
  }
});

export const getSpecificCarController = publicProcedure
  .input(z.string())
  .query(async (opts) => {
    try {
      return await getSpecificCarService(opts.input);
    } catch (error) {
      console.error('Error in getSpecificCarService procedure:', error);
      throw error;
    }
  });

export const addNewCarController = publicProcedure
  .input(
    z.object({
      car_number: z.string(),
      model: z.string(),
      color: z.string(),
      status: z.string(),
      driver: z.string(),
      location: z.string(),
    })
  )
  .mutation(async (opts) => {
    try {
      const { car_number, model, color, status, driver, location } = opts.input;
      const addedCar = await addNewCarService({
        car_number,
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
      car_number: z.string(),
      new_status: z.string(),
    })
  )
  .mutation(async (opts) => {
    try {
      const updatedCarStatus = await updateCarStatusService(
        opts.input.car_number,
        opts.input.new_status
      );
      return updatedCarStatus;
    } catch (error) {
      console.error('Error in updateCarStatusService procedure:', error);
      throw error;
    }
  });

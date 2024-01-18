import { z } from 'zod';
import { publicProcedure } from '../tRPC';
import {
  getAllCarsService,
  getSpecificCarService,
  deleteCarService,
  updateCarStatusService,
  addNewCarService,
  updateCarLocationService,
} from './carsService';

export const getAllCarsController = publicProcedure
  .input(z.string())
  .query(async (opts) => {
    try {
      return await getAllCarsService(opts.input);
    } catch (error) {
      return 'Not Data';
    }
  });

export const getSpecificCarController = publicProcedure
  .input(z.object({ carNumber: z.string(), token: z.string() }))
  .query(async (opts) => {
    const { carNumber, token } = opts.input;
    try {
      return await getSpecificCarService(carNumber, token);
    } catch (error) {
      return null;
    }
  });

export const addNewCarController = publicProcedure
  .input(
    z.object({
      token: z.string(),
      newCar: z.object({
        carNumber: z.string(),
        model: z.string(),
        color: z.string(),
        status: z.string(),
        driver: z.string(),
        location: z.string(),
      }),
    })
  )
  .mutation(async (opts) => {
    try {
      const {
        token,
        newCar: { carNumber, model, color, status, driver, location },
      } = opts.input;
      const addedCar = await addNewCarService(token, {
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
  .input(z.object({ carNumber: z.string(), token: z.string() }))
  .mutation(async (opts) => {
    const { carNumber, token } = opts.input;
    try {
      const deletedCar = await deleteCarService(carNumber, token);
      return deletedCar;
    } catch (error) {
      console.error('Error in getSpecificCarService procedure:', error);
      throw error;
    }
  });

export const updateCarStatusController = publicProcedure
  .input(
    z.object({
      token: z.string(),
      updatedStatus: z.object({
        carNumber: z.string(),
        newStatus: z.string(),
      }),
    })
  )
  .mutation(async (opts) => {
    try {
      const {
        token,
        updatedStatus: { carNumber, newStatus },
      } = opts.input;
      const newStatusData = { carNumber, newStatus };
      const updatedCarStatus = await updateCarStatusService(
        token,
        newStatusData
      );
      return updatedCarStatus;
    } catch (error) {
      console.error('Error in updateCarStatusService procedure:', error);
      throw error;
    }
  });

export const updateCarLocationController = publicProcedure
  .input(
    z.object({
      token: z.string(),
      updatedLocation: z.object({
        carNumber: z.string(),
        newLocation: z.string(),
      }),
    })
  )
  .mutation(async (opts) => {
    try {
      const {
        token,
        updatedLocation: { carNumber, newLocation },
      } = opts.input;
      const newLocationData = { carNumber, newLocation };
      const updatedCarLocation = await updateCarLocationService(
        token,
        newLocationData
      );
      return updatedCarLocation;
    } catch (error) {
      console.error('Error in updateCarLocationService procedure:', error);
      throw error;
    }
  });

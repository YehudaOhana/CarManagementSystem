import { router } from '../tRPC';
import {
  getAllCarsController,
  getSpecificCarController,
  deleteCarController,
  updateCarStatusController,
  addNewCarController,
} from './carsController';

export const appRouter = router({
  getAllCars: getAllCarsController,
  getSpecificCar: getSpecificCarController,
  deleteCar: deleteCarController,
  updateCarStatus: updateCarStatusController,
  addNewCar: addNewCarController,
});

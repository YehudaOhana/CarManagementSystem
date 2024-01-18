import { router } from '../tRPC';
import {
  getAllCarsController,
  getSpecificCarController,
  deleteCarController,
  updateCarStatusController,
  addNewCarController,
  updateCarLocationController,
} from './carsController';

export const appRouter = router({
  getAllCars: getAllCarsController,
  getSpecificCar: getSpecificCarController,
  addNewCar: addNewCarController,
  deleteCar: deleteCarController,
  updateCarStatus: updateCarStatusController,
  updateCarLocation: updateCarLocationController,
});

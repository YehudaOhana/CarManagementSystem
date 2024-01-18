import { sequelize } from '../db/postgreSQLConnect';
import { Car } from '../db/carsModel';
import chalk from 'chalk';
import {
  CarInterface,
  newLocationInterface,
  newStatusInterface,
} from '../interfaces/carInterface';

export const getAllCarsDal = async (token: string) => {
  await sequelize.sync();
  const getAllData = await Car.findAll();

  const values = getAllData.map((c) => {
    const carData = c.get();
    return {
      carNumber: carData.car_number,
      color: carData.color,
      driver: carData.driver,
      location: carData.location,
      model: carData.model,
      status: carData.status,
    };
  });
  console.log(chalk.yellow('All information arrived successfully!!'));
  return values;
};

export const getSpecificCarDal = async (carNumber: string, token: string) => {
  const findSpecificCar = await Car.findOne({
    where: { car_number: carNumber },
  });
  const value = findSpecificCar.get();
  return {
    carNumber: value.car_number,
    color: value.color,
    driver: value.driver,
    location: value.location,
    model: value.model,
    status: value.status,
  };
};

export const addNewCarDal = async (newCar: CarInterface, token: string) => {
  const addNewCar = await Car.create({
    car_number: newCar.carNumber,
    model: newCar.model,
    color: newCar.color,
    status: newCar.status,
    driver: newCar.driver,
    location: newCar.location,
  });
  return addNewCar.dataValues;
};

export const deleteCarDal = async (carNumber: string, token: string) => {
  await Car.destroy({
    where: { car_number: carNumber },
  });
  console.log(chalk.yellow(`${carNumber} deleted successfully!!`));
  return `car number '${carNumber}' deleted successfully!!`;
};

export const updateCarStatusDal = async (
  updatedStatus: newStatusInterface,
  token: string
) => {
  await Car.update(
    { status: updatedStatus.newStatus },
    { where: { car_number: updatedStatus.carNumber } }
  );
  console.log(
    chalk.yellow(`${updatedStatus.carNumber} status updated successfully!!`)
  );
  return `Car number '${updatedStatus.carNumber}' status updated to '${updatedStatus.newStatus}' successfully!!`;
};

export const updateCarLocationDal = async (
  updatedLocation: newLocationInterface,
  token: string
) => {
  await Car.update(
    { location: updatedLocation.newLocation },
    { where: { car_number: updatedLocation.carNumber } }
  );
  console.log(
    chalk.yellow(`${updatedLocation.carNumber} status updated successfully!!`)
  );
  return `Car number '${updatedLocation.carNumber}' status updated to '${updatedLocation.newLocation}' successfully!!`;
};

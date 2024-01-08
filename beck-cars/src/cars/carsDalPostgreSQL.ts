import { sequelize } from '../db/connectPostgreSQL';
import { Car } from '../db/carsModel';
import chalk from 'chalk';
import { CarInterface } from '../interfaces/carInterface';

export const getAllCarsDal = async () => {
  await sequelize.sync();
  const getAllData = (await Car.findAll()).map((c) => {
    return c.dataValues;
  });
  console.log(chalk.yellow('All information arrived successfully!!'));
  return getAllData;
};

export const getSpecificCarDal = async (carNumber: string) => {
  const findSpecificCar = await Car.findOne({
    where: { car_number: carNumber },
  });
  console.log(chalk.yellow(`${carNumber} arrived successfully!!`));
  return findSpecificCar.dataValues;
};

export const addNewCarDal = async (newCar: CarInterface) => {
  const addNewCar = await Car.create({ ...newCar });
  console.log(
    chalk.yellow(`Car added successfully!! : `),
    addNewCar.dataValues
  );
  return addNewCar.dataValues;
};

export const deleteCarDal = async (carNumber: string) => {
  const deletedCar = await Car.destroy({
    where: { car_number: carNumber },
  });
  console.log(chalk.yellow(`${carNumber} deleted successfully!!`));
  return `car number '${carNumber}' deleted successfully!!`;
};

export const updateCarStatusDal = async (
  carNumber: string,
  newStatus: string
) => {
  const updatedCar = await Car.update(
    { status: newStatus },
    { where: { car_number: carNumber } }
  );
  console.log(chalk.yellow(`${carNumber} status updated successfully!!`));
  return `Car number '${carNumber}' status updated to '${newStatus}' successfully!!`;
};

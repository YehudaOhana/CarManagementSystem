import React, { useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';
import { tRPC } from '../../services/tRPCClient';
import CreateCardCars from '../common/CreateCardCar';
import { CarInterface } from 'beck-cars/src/interfaces/carInterface';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataAllCars, setDataAllCars] = useState<CarInterface[]>([]);

  const getAllCars = async () => {
    try {
      setIsLoading(true);
      const res = await tRPC.getAllCars.query();
      if (res !== 'Not Data') setDataAllCars(res);
    } catch (error) {
      console.error('Error deleting car:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCar = async (carNumber: string) => {
    try {
      await tRPC.deleteCar.mutate(carNumber);
      console.log('Car deleted successfully:', carNumber);
      setDataAllCars((prevCars) =>
        prevCars.filter((newData) => newData.carNumber !== carNumber)
      );
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleUpdateStatus = async (carNumber: string, newStatus: string) => {
    try {
      await tRPC.updateCarStatus.mutate({
        carNumber: carNumber,
        newStatus: newStatus,
      });

      setDataAllCars((prevData) => {
        return prevData.map((car) =>
          car.carNumber === carNumber ? { ...car, status: newStatus } : car
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <div className="pt-20">
      {isLoading ? (
        <div className="flex justify-center items-start h-screen pt-20 mt-20">
          <PropagateLoader
            color="rgb(196, 71, 74)"
            size={12}
            speedMultiplier={3}
          />
        </div>
      ) : (
        <div className="container mx-auto py-20 grid gap-4 lg:grid-cols-4">
          {dataAllCars.map((item: CarInterface) => (
            <CreateCardCars
              key={item.carNumber}
              carNumber={item.carNumber}
              color={item.color}
              driver={item.driver}
              location={item.location}
              model={item.model}
              status={item.status}
              onDeleteCar={handleDeleteCar}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}
      {dataAllCars.length < 1 && (
        <h1 className="flex justify-center items-start  h-screen pt-20 mt-20 text-9xl  text-red-600">
          Not Networking
        </h1>
      )}
    </div>
  );
};

export default HomePage;

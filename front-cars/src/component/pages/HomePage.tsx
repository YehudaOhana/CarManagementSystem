import React, { useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';
import { tRPC } from '../../services/tRPCClient';
import CreateCardCars from '../common/CreateCardCar';
import { CarInterface } from 'beck-cars/src/interfaces/carInterface';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataAllCars, setDataAllCars] = useState<CarInterface[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const getAllCars = async () => {
    if (!token) {
      navigate(`/loginForm`);
      return;
    }
    try {
      setIsLoading(true);
      const res = await tRPC.getAllCars.query(token);
      if (res !== 'Not Data' && res !== undefined) setDataAllCars(res);
    } catch (error) {
      console.error('Error deleting car:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCar = async (carNumber: string) => {
    if (!token) {
      navigate(`/loginForm`);
      return;
    }
    try {
      await tRPC.deleteCar.mutate({
        carNumber: carNumber,
        token: token,
      });
      console.log('Car deleted successfully:', carNumber);
      setDataAllCars((prevCars) =>
        prevCars.filter((newData) => newData.carNumber !== carNumber)
      );
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleUpdateStatus = async (carNumber: string, newStatus: string) => {
    if (!token) {
      navigate(`/loginForm`);
      return;
    }
    try {
      await tRPC.updateCarStatus.mutate({
        token: token,
        updatedStatus: {
          carNumber: carNumber,
          newStatus: newStatus,
        },
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
  }, [token]);

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
    </div>
  );
};

export default HomePage;

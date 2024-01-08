import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { CarInterface } from '../../../beck-cars/src/interfaces/carInterface';
import useGetAllCars from '../Hooks/getAllCars';
import { useDeleteCar } from '../Hooks/deleteCar';
import useUpdateStatus from '../Hooks/updateStatus';
import { useAtom } from 'jotai';
import { atomIsLoading, atomNewStatus } from '../state/atoms';

const HomePage: React.FC = () => {
  const { dataAllCars, getAllCars } = useGetAllCars();
  const { handleDeleteCar } = useDeleteCar();
  const { handleUpdateStatus } = useUpdateStatus();
  const [isLoading] = useAtom(atomIsLoading);
  const [newStatus] = useAtom(atomNewStatus);

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <div className="pt-20">
      {isLoading ? (
        <div className="flex justify-center items-start h-screen pt-20 mt-20">
          <PropagateLoader
            className=""
            color="rgb(196, 71, 74)"
            size={12}
            speedMultiplier={3}
          />
        </div>
      ) : (
        <div className="container mx-auto py-20 grid gap-4 lg:grid-cols-5">
          {dataAllCars.map((item: CarInterface) => (
            <div
              key={item.car_number}
              className="mb-6 p-6 space-y-8 bg-gray-800 bg-opacity-90 hover:bg-gray-700 shadow-md rounded-3xl"
            >
              <Link
                to={`specificCar/${item.car_number}`}
                className="text-xl text-gray-300 space-y-5"
              >
                <h1 className="text-2xl font-extrabold text-cyan-500">
                  {item.car_number}
                </h1>
                <h3>model: {item.model}</h3>
                <p>color: {item.color}</p>
                <p>driver: {item.driver}</p>
                <p>location: {item.location}</p>
                <p>status: {item.status}</p>
              </Link>
              <div className="mt-4 flex">
                <select
                  className="border p-2 rounded-3xl shadow-sm focus:ring focus:border-cyan-500 flex-grow-1"
                  value={newStatus}
                  onChange={(e) => {
                    handleUpdateStatus(item.car_number, e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select new status
                  </option>
                  <option value="In Use:">In Use:</option>
                  <option value="Maintenance:">Maintenance:</option>
                  <option value="Out of Service">Out of Service</option>
                </select>
              </div>
              <svg
                className="h-8 w-8 text-cyan-500 cursor-pointer hover:text-red-600 active:text-yellow-500"
                onClick={() => {
                  handleDeleteCar(item.car_number);
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

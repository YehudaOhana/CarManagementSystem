import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import useGetSpecificCar from '../Hooks/getSpecificCar';
import { useDeleteCar } from '../Hooks/deleteCar';
import useUpdateStatus from '../Hooks/updateStatus';
import { useAtom } from 'jotai';
import { atomIsLoading, atomNewStatus } from '../state/atoms';

const SpecificCar: React.FC = () => {
  const { dataSpecificCar, getSpecificCar } = useGetSpecificCar();
  const { handleDeleteCar } = useDeleteCar();
  const { handleUpdateStatus } = useUpdateStatus();
  const [newStatus] = useAtom(atomNewStatus);
  const params = useParams<{ CarNumber: string }>();
  const [isLoading] = useAtom(atomIsLoading);

  useEffect(() => {
    if (params.CarNumber) getSpecificCar(params.CarNumber);
  }, []);

  return (
    <div className=" max-w-md mx-auto pt-20 pb-20 mt-8 p-6 rounded-md shadow-md bg-gray-800 bg-opacity-90">
      {isLoading || dataSpecificCar === null ? (
        <div className="flex justify-center items-start h-screen pt-10 mt-20">
          <PropagateLoader
            className=""
            color="rgb(196, 71, 74)"
            size={12}
            speedMultiplier={3}
          />
        </div>
      ) : (
        <div className=" p-8 rounded-xl shadow-md space-y-10">
          <h1 className="flex justify-center  text-4xl font-bold text-cyan-500 mb-4">
            {dataSpecificCar.car_number}
          </h1>
          <p className="text-gray-300 text-2xl">
            model: {dataSpecificCar.model}
          </p>
          <p className="text-gray-300 text-2xl">
            color: {dataSpecificCar.color}
          </p>
          <p className="text-gray-300 text-2xl">
            driver: {dataSpecificCar.driver}
          </p>
          <p className="text-gray-300 text-2xl">
            location: {dataSpecificCar.location}
          </p>
          <p className="text-gray-300 text-2xl">
            status: {dataSpecificCar.status}
          </p>
          <div className="mt-4  flex">
            <select
              className="border p-2 rounded-3xl shadow-sm focus:ring focus:border-cyan-500 flex-grow-1"
              value={newStatus}
              onChange={(e) => {
                handleUpdateStatus(dataSpecificCar.car_number, e.target.value);
              }}
            >
              <option value="" disabled>
                Select new status
              </option>
              <option value="In Use:">In Use:</option>
              <option value="In Maintenance:">In Maintenance:</option>
              <option value="Out of Service">Out of Service</option>
            </select>
          </div>
          <Link to={'/'}>
            <svg
              className=" mx-auto mt-10 h-10 w-10 text-cyan-500 cursor-pointer hover:text-red-600 active:text-yellow-500  pt-3"
              onClick={() => handleDeleteCar(dataSpecificCar.car_number)}
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
          </Link>
        </div>
      )}
      <Link to={`/`} className="block mt-4 text-cyan-500 hover:text-yellow-500">
        Return to home page
      </Link>
    </div>
  );
};

export default SpecificCar;

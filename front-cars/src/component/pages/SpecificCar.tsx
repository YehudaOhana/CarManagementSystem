import { CarInterface } from 'beck-cars/src/interfaces/carInterface';
import { tRPC } from '../../services/tRPCClient';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

const SpecificCar: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [dataSpecificCar, setDataSpecificCar] = useState<CarInterface | null>(
    null
  );
  const params = useParams<{ CarNumber: string }>();
  const navigate = useNavigate();

  const getSpecificCar = async (CarNumber: string) => {
    setIsLoading(true);
    try {
      const res = await tRPC.getSpecificCar.query(CarNumber);
      setDataSpecificCar(res);
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCar = async (carNumber: string) => {
    setIsLoadingButton(true);
    try {
      const result = await tRPC.deleteCar.mutate(carNumber);
      console.log('Car deleted successfully:', carNumber);
      navigate(`/`);
      return result;
    } catch (error) {
      console.error('Error deleting car:', error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  const handleUpdateStatus = async (carNumber: string, newStatus: string) => {
    setIsLoadingButton(true);
    try {
      const result = await tRPC.updateCarStatus.mutate({
        carNumber: carNumber,
        newStatus: newStatus,
      });
      setDataSpecificCar((prevData) => {
        if (prevData) {
          return { ...prevData, status: newStatus };
        }
        return null;
      });
      setNewStatus('');
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingButton(false);
    }
  };

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
            {dataSpecificCar.carNumber}
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
          <div className="flex justify-between">
            <div className="">
              <select
                className="border p-2 rounded-3xl shadow-sm focus:ring focus:border-cyan-500 flex-grow-1"
                value={newStatus}
                onChange={(e) => {
                  handleUpdateStatus(dataSpecificCar.carNumber, e.target.value);
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
            {isLoadingButton && (
              <svg
                className="w-9 h-9 text-black animate-spin"
                aria-hidden="true"
                role="status"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </div>
          <div className="flex justify-between">
            <Link
              to={`/`}
              className="block mt-4 text-cyan-500 hover:text-yellow-500"
            >
              Return to home page
            </Link>
            <svg
              className="h-10 w-10 text-cyan-500 cursor-pointer hover:text-red-600 active:text-yellow-500  pt-3"
              onClick={() => handleDeleteCar(dataSpecificCar.carNumber)}
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
        </div>
      )}
    </div>
  );
};

export default SpecificCar;

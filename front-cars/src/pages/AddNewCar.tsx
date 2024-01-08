import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import useSetNewCar from '../Hooks/setNewCar';
import useInputNewCar from '../Hooks/inputNewCar';
import {
  atomInputNewCar,
  atomInputNewCarError,
  atomIsLoadingButton,
} from '../state/atoms';

const AddNewCar = () => {
  const { handleAddNewCar } = useSetNewCar();
  const { handleInputChange } = useInputNewCar();
  const [inputNewCar] = useAtom(atomInputNewCar);
  const [isLoadingButton] = useAtom(atomIsLoadingButton);
  const [inputNewCarError] = useAtom(atomInputNewCarError);

  return (
    <div className="max-w-md mx-auto pt-20 pb-20 mt-8 p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleAddNewCar} className="space-y-4">
        {['car_number', 'model', 'color', 'driver', 'location'].map((field) => (
          <div key={field} className="mb-4">
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700"
            >
              {field.replace('_', ' ')}:
            </label>
            <input
              className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:border-blue-500"
              type="text"
              id={field}
              name={field}
              value={inputNewCar[field as keyof typeof inputNewCar]}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status:
          </label>
          <select
            className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:border-blue-500"
            id="status"
            name="status"
            value={inputNewCar.status}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="In Use:">In Use:</option>
            <option value="Maintenance:">Maintenance:</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div>
        <p className="text-red-500 h-1 text-xs">{inputNewCarError}</p>
        <button
          type="submit"
          className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-400 focus:outline-none focus:bg-cyan-600 active:bg-cyan-700 relative"
          disabled={isLoadingButton}
        >
          {isLoadingButton && (
            <svg
              className="inline w-6 h-6 text-white animate-spin"
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
          {isLoadingButton ? '' : 'Add Car'}
        </button>
      </form>
      <Link to={`/`} className="block mt-4 text-blue-500 hover:text-yellow-500">
        Return to home page
      </Link>
    </div>
  );
};

export default AddNewCar;

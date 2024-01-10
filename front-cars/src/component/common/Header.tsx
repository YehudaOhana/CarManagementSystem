import { tRPC } from '../../services/tRPCClient';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);
  const [inputSearchError, setInputSearchError] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const handleIconClick = () => {
    setRotation(rotation + 99999999999999);
  };

  const handleSearchCar = async () => {
    if (inputSearch === '') return setInputSearchError('Enter Car Number');
    setIsLoadingButton(true);
    try {
      const res = await tRPC.getSpecificCar.query(inputSearch);
      if (res && res.carNumber === inputSearch) {
        navigate(`specificCar/${inputSearch}`);
        setInputSearchError('');
        setInputSearch('');
      } else setInputSearchError(`Not Found Car`);
    } catch (error) {
      setInputSearchError(`Not Found Car`);
    } finally {
      setIsLoadingButton(false);
    }
  };

  return (
    <nav className="py-5  bg-cyan-500 fixed top-0 left-0 right-0">
      <div className="flex items-center justify-between mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4">
        <section className="flex items-center text-gray-900 space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-7 w-7 transition-transform  duration-1000 cursor-pointer rotate-360 hover:text-red-500 active:text-yellow-500`}
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={handleIconClick}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <path
              fillRule="evenodd"
              d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
              clipRule="evenodd"
            />
          </svg>
          <Link
            to={`/`}
            className="font-bold text-xl hover:text-white active:text-yellow-500"
          >
            Car Management System
          </Link>
        </section>
        <section>
          <ul className="md:space-x-8 space-x-8 text-gray-900 font-semibold hidden md:flex">
            <li>
              <div>
                <input
                  type="text"
                  placeholder="Search Car Number"
                  className="border text-sm h-6 w-21 p-1 rounded-l-3xl shadow-sm focus:ring focus:border-cyan-500 pl-8 flex-grow-1"
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                  onBlur={() => setInputSearchError('')}
                />
                <button
                  className="h-6 p-1 px-5 text-sm font-medium text-white bg-cyan-500 rounded-r-3xl border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10  inline-flex items-center"
                  onClick={handleSearchCar}
                >
                  {isLoadingButton && (
                    <svg
                      className=" w-11 max-h-2.5 border-none  text-black animate-spin "
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
                  {isLoadingButton ? '' : 'Search'}
                </button>
                <p className="text-red-500 h-1 text-xs">{inputSearchError}</p>
              </div>
            </li>
            <li>
              <Link to={`addNewCar/`}>
                <svg
                  className="h-6 w-6 text-gray-900 hover:text-white active:text-yellow-500 focus:ring"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />{' '}
                  <line x1="12" y1="8" x2="12" y2="16" />{' '}
                  <line x1="8" y1="12" x2="16" y2="12" />{' '}
                </svg>
              </Link>
            </li>
            <li className="relative group">
              <Link
                to={'/'}
                className="hover:text-white active:text-yellow-500"
              >
                Home
              </Link>
              <div className="w-full h-0.5 bg-transparent group-hover:bg-white transition-al absolute bottom-0" />
            </li>
            <li className="relative group">
              <Link
                to={'mapCars/'}
                className="hover:text-white active:text-yellow-500"
              >
                Map Cars
              </Link>
              <div className="w-full h-0.5 bg-transparent group-hover:bg-white transition-al absolute bottom-0" />
            </li>
            <li>
              <a
                href="#"
                className="bg-gray-900 px-4 py-1 rounded-xl text-white hover:bg-white hover:text-gray-900 active:text-yellow-500"
              >
                Contact
              </a>
            </li>
          </ul>
        </section>
      </div>
    </nav>
  );
};

export default Header;

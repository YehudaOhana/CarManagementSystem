import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSearchCar from '../Hooks/searchCar';
import { atomInputSearch, atomInputSearchError } from '../state/atoms';
import { useAtom } from 'jotai';

const Header = () => {
  const [inputSearchError] = useAtom(atomInputSearchError);
  const [inputSearch, setInputSearch] = useAtom(atomInputSearch);
  const [rotation, setRotation] = useState(0);
  const { searchCar } = useSearchCar();

  const handleIconClick = () => {
    setRotation(rotation + 99999999999999);
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
          <ul className="md:space-x-8 space-x-6 text-gray-900 font-semibold hidden md:flex">
            <li>
              <div>
                <input
                  type="text"
                  placeholder="Search Car"
                  className="border text-sm h-6 w-21 p-1 rounded-l-3xl shadow-sm focus:ring focus:border-cyan-500 pl-8 flex-grow-1"
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                />
                <button
                  className="h-6 p-1 px-5 text-sm font-medium text-white bg-cyan-500 rounded-r-3xl border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                  onClick={() => searchCar(inputSearch)}
                >
                  Search
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

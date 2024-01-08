import { useSetAtom } from 'jotai';
import { ChangeEvent } from 'react';
import { atomInputNewCar } from '../state/atoms';

const useInputNewCar = () => {
  const setInputNewCar = useSetAtom(atomInputNewCar);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputNewCar((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return { handleInputChange };
};

export default useInputNewCar;

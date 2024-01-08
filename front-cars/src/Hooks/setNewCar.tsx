import { tRPC } from '../tRPCClient';
import { useNavigate } from 'react-router-dom';
import {
  atomInputNewCar,
  atomInputNewCarError,
  atomIsLoadingButton,
} from '../state/atoms';
import { useAtom, useSetAtom } from 'jotai';
import { FormEvent } from 'react';

const useSetNewCar = () => {
  const navigate = useNavigate();
  const setIsLoadingButton = useSetAtom(atomIsLoadingButton);
  const [inputNewCar, setInputNewCar] = useAtom(atomInputNewCar);
  const setInputNewCarError = useSetAtom(atomInputNewCarError);

  const handleAddNewCar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = Object.values(inputNewCar).every(
      (value) => value !== ''
    );

    if (!isFormValid) {
      setInputNewCarError('Please fill in all fields before submitting.');
      return;
    }

    try {
      setIsLoadingButton(true);
      const result = await tRPC.addNewCar.mutate(inputNewCar);
      console.log('Car added successfully:', inputNewCar);
      navigate('/');
      setInputNewCarError('');
      setInputNewCar({
        car_number: '',
        model: '',
        color: '',
        status: '',
        driver: '',
        location: '',
      });
      return result;
    } catch (error) {
      console.error('Error adding car:', error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  return { handleAddNewCar };
};

export default useSetNewCar;

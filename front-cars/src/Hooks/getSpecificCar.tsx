import { useAtom, useSetAtom } from 'jotai';
import { tRPC } from '../tRPCClient';
import { CarInterface } from '../../../beck-cars/src/interfaces/carInterface';
import { atomDataSpecificCar, atomIsLoading } from '../state/atoms';

const useGetSpecificCar = () => {
  const [dataSpecificCar, setDataSpecificCar] = useAtom(atomDataSpecificCar);

  const setIsLoading = useSetAtom(atomIsLoading);

  const getSpecificCar = async (CarNumber: string) => {
    try {
      setIsLoading(true);
      if (CarNumber) {
        const res = await tRPC.getSpecificCar.query(CarNumber);
        console.log('Car number from URL:', CarNumber);
        setDataSpecificCar(res);
      } else console.log('not entered car number');
    } catch (error) {
      console.error('Error calling getSpecificCar query:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { dataSpecificCar, getSpecificCar };
};

export default useGetSpecificCar;

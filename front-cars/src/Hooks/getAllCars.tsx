import { tRPC } from '../tRPCClient';
import { useAtom, useSetAtom } from 'jotai';
import { atomDataAllCars, atomIsLoading } from '../state/atoms';

const useGetAllCars = () => {
  const [dataAllCars, setDataAllCars] = useAtom(atomDataAllCars);
  const setIsLoading = useSetAtom(atomIsLoading);

  const getAllCars = async () => {
    try {
      setIsLoading(true);
      const res = await tRPC.getAllCars.query();
      setDataAllCars(res);
    } catch (error) {
      console.error('Error calling getAllCars query:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { dataAllCars, getAllCars };
};

export default useGetAllCars;

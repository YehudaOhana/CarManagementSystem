import { atomDataAllCars, atomIsLoadingButton } from '../state/atoms';
import { tRPC } from '../tRPCClient';
import { useSetAtom } from 'jotai';

export const useDeleteCar = () => {
  const setData = useSetAtom(atomDataAllCars);
  const setIsLoadingButton = useSetAtom(atomIsLoadingButton);

  const handleDeleteCar = async (carNumber: string) => {
    try {
      setIsLoadingButton(true);
      const result = await tRPC.deleteCar.mutate(carNumber);
      console.log('Car deleted successfully:', carNumber);
      setData((prevCars) =>
        prevCars.filter((newData) => newData.car_number !== carNumber)
      );
      return result;
    } catch (error) {
      console.error('Error deleting car:', error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  return { handleDeleteCar };
};

import { useSetAtom } from 'jotai';
import { tRPC } from '../tRPCClient';
import {
  atomDataAllCars,
  atomDataSpecificCar,
  atomIsLoadingButton,
  atomNewStatus,
} from '../state/atoms';

const useUpdateStatus = () => {
  const setDataSpecificCar = useSetAtom(atomDataSpecificCar);
  const setData = useSetAtom(atomDataAllCars);
  const setNewStatus = useSetAtom(atomNewStatus);
  const setIsLoadingButton = useSetAtom(atomIsLoadingButton);

  const handleUpdateStatus = async (carNumber: string, newStatus: string) => {
    try {
      setIsLoadingButton(true);
      const result = await tRPC.updateCarStatus.mutate({
        car_number: carNumber,
        new_status: newStatus,
      });

      setDataSpecificCar(
        (prevData) => prevData && { ...prevData, status: newStatus }
      );

      setData((prevData) =>
        prevData.map((car) =>
          car.car_number === carNumber ? { ...car, status: newStatus } : car
        )
      );

      setNewStatus('');

      console.log(result);
      return result;
    } catch (error) {
    } finally {
      setIsLoadingButton(false);
    }
  };

  return { handleUpdateStatus };
};

export default useUpdateStatus;

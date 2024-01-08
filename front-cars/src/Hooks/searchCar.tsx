import { useNavigate } from 'react-router-dom';
import { atomInputSearch, atomInputSearchError } from '../state/atoms';
import { useSetAtom } from 'jotai';
import { tRPC } from '../tRPCClient';

const useSearchCar = () => {
  const navigate = useNavigate();
  const setInputSearchError = useSetAtom(atomInputSearchError);
  const setInputSearch = useSetAtom(atomInputSearch);

  const searchCar = async (CarNumber: string) => {
    try {
      if (CarNumber) {
        const res = await tRPC.getSpecificCar.query(CarNumber);
        console.log('Car number from URL:', CarNumber);
        if (res.car_number === CarNumber) {
          navigate(`specificCar/${CarNumber}`);
          setInputSearchError('');
          setInputSearch('');
        } else setInputSearchError(`Not Found`);
      }
    } catch (error) {
      setInputSearchError(`Not Found Car`);
    }
  };

  return { searchCar };
};

export default useSearchCar;

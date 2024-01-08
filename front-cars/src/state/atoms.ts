import { atom } from 'jotai';
import { CarInterface } from '../../../beck-cars/src/interfaces/carInterface';

export const atomDataAllCars = atom<CarInterface[]>([]);
export const atomIsLoading = atom<boolean>(false);
export const atomIsLoadingButton = atom<boolean>(false);
export const atomDataSpecificCar = atom<CarInterface | null>(null);
export const atomNewStatus = atom<string>('');
export const atomInputSearch = atom<string>('');
export const atomInputSearchError = atom<string>('');
export const atomInputNewCarError = atom<string>('');
export const atomInputNewCar = atom<CarInterface>({
  car_number: '',
  model: '',
  color: '',
  status: '',
  driver: '',
  location: '',
});

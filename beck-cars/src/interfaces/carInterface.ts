export interface CarInterface {
  carNumber: string;
  model: string;
  color: string;
  status: string;
  driver: string;
  location: string;
}

export interface CarInterfaceDB {
  car_number: string;
  model: string;
  color: string;
  status: string;
  driver: string;
  location: string;
}

export interface newStatusInterface {
  carNumber: string;
  newStatus: string;
}

export interface newLocationInterface {
  carNumber: string;
  newLocation: string;
}

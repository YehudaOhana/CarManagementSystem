import HomePage from '../component/pages/HomePage';
import SpecificCar from '../component/pages/SpecificCar';
import AddNewCar from '../component/pages/AddNewCar';
import { Route, Routes } from 'react-router-dom';
import MapCars from '../component/pages/MapCars';
import Layout from '../component/layout/MainLayout';

export function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/specificCar/:CarNumber" element={<SpecificCar />} />
          <Route path="/addNewCar" element={<AddNewCar />} />
          <Route path="/mapCars" element={<MapCars />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

import HomePage from '../pages/HomePage';
import SpecificCar from '../pages/SpecificCar';
import AddNewCar from '../pages/AddNewCar';
import { Route, Routes } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import MapCars from '../pages/MapCars';

export function App() {
  return (
    <>
      <Header />
      <div className="bg-pack-train bg-cover bg-center bg-fixed">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/specificCar/:CarNumber" element={<SpecificCar />} />
          <Route path="/addNewCar" element={<AddNewCar />} />
          <Route path="/mapCars" element={<MapCars />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

import { Link } from 'react-router-dom';

const MapCars: React.FC = () => {
  return (
    <div className="h-screen pt-20">
      <div className="container mx-auto py-20 grid gap-4 lg:grid-cols-5">
        <h1 className="text-white">Map Cars</h1>
        <Link to={`/`} className="block mt-4 text-white hover:text-yellow-500">
          Return to home page
        </Link>
      </div>
    </div>
  );
};
export default MapCars;

import React, { useEffect, useState } from 'react';
import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import {
  RMap,
  RLayerVector,
  RFeature,
  ROverlay,
  RStyle,
  RLayerTile,
} from 'rlayers';
import locationIcon from '../../images/locationIcon.png';
import { Link, useNavigate } from 'react-router-dom';
import { CarInterface } from 'beck-cars/src/interfaces/carInterface';
import { tRPC } from '../../services/tRPCClient';

// Import Axios for making HTTP requests
import axios from 'axios';

const coords: Record<string, Coordinate> = {
  origin: [34.772, 32.089],
};

interface CarInterfaceCoordinate extends CarInterface {
  coordinates?: Coordinate;
}

function Map(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [dataAllCars, setDataAllCars] = useState<CarInterfaceCoordinate[]>([]);
  const [geoCodedCars, setGeoCodedCars] = useState<CarInterfaceCoordinate[]>(
    []
  );
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const geoCodeLocation = async (location: string) => {
    try {
      const response = await axios.get(
        `https://geocode.maps.co/search?q=${location}&api_key=${process.env.OPENCAGE_API_KEY}`
      );

      const data = response.data;

      if (data.results && data.results.length > 0 && data.results[0].geometry) {
        const { lat, lng } = data.results[0].geometry;
        return fromLonLat([lng, lat]);
      } else {
        console.error(`Geocoding failed for location: ${location}`);
        return null;
      }
    } catch (error) {
      console.error('Error geocoding location:', error);
      return null;
    }
  };

  const displayCarsOnMap = async () => {
    if (!token) {
      navigate(`/loginForm`);
      return;
    }
    try {
      setIsLoading(true);
      const res = await tRPC.getAllCars.query(token);
      if (res !== 'Not Data' && res !== undefined) {
        setDataAllCars(res);

        const geocodedCars = await Promise.all(
          res.map(async (car) => {
            const carCoordinates = await geoCodeLocation(car.location);
            return carCoordinates
              ? {
                  ...car,
                  coordinates: carCoordinates,
                }
              : null;
          })
        );

        setGeoCodedCars(
          geocodedCars.filter((car) => car !== null) as CarInterfaceCoordinate[]
        );
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    displayCarsOnMap();
  }, []); // Make sure to run this only once when the component mounts

  return (
    <>
      <RMap
        className="w-full h-[1000px]"
        initial={{ center: fromLonLat(coords.origin), zoom: 11 }}
      >
        {/* Replace the Google Maps layer with OpenStreetMap */}
        <RLayerTile url="http://openmapsurfer.uni-hd.de/tiles/roads/x={x}&y={y}&z={z}" />
        <RLayerVector zIndex={10}>
          <RStyle.RStyle>
            <RStyle.RIcon src={locationIcon} scale={0.08} anchor={[0.5, 0.8]} />
          </RStyle.RStyle>

          {geoCodedCars.map((car) => (
            <RFeature
              key={car.carNumber}
              geometry={new Point(car.coordinates!)}
            >
              <ROverlay className="example-overlay">
                {car.driver}'s Car
                <br />
                <em>&#11017; Click to zoom</em>
              </ROverlay>
            </RFeature>
          ))}
        </RLayerVector>
      </RMap>
      <Link to={`/`} className="block mt-4 text-white hover:text-yellow-500">
        Return to home page
      </Link>
    </>
  );
}

export default Map;

// import { fromLonLat } from 'ol/proj';
// import { Coordinate } from 'ol/coordinate';
// import { Point } from 'ol/geom';
// import {
//   RMap,
//   ROSM,
//   RLayerVector,
//   RFeature,
//   ROverlay,
//   RStyle,
//   RLayerTile,
// } from 'rlayers';
// import locationIcon from '../../images/locationIcon.png';
// import { Link } from 'react-router-dom';

// const coords: Record<string, Coordinate> = {
//   origin: [34.772, 32.089],
//   ArcDeTriomphe: [2.295, 48.8737],
// };

// function Map(): JSX.Element {
//   return (
//     <>
//       <RMap
//         className="w-full h-[1000px]"
//         initial={{ center: fromLonLat(coords.origin), zoom: 11 }}
//       >
//         <RLayerTile url="http://mt0.google.com/vt/lyrs=m&hl=he&x={x}&y={y}&z={z}" />
//         <RLayerVector zIndex={10}>
//           <RStyle.RStyle>
//             <RStyle.RIcon src={locationIcon} scale={0.08} anchor={[0.5, 0.8]} />
//           </RStyle.RStyle>
//           <RFeature
//             geometry={new Point(fromLonLat(coords.ArcDeTriomphe))}
//             // onClick={(e) =>
//             //   e.map.getView().fit(e.target.getGeometry().getExtent(), {
//             //     duration: 250,
//             //     maxZoom: 15,
//             //   })
//             // }
//           >
//             <ROverlay className="example-overlay">
//               Arc de Triomphe
//               <br />
//               <em>&#11017; click to zoom</em>
//             </ROverlay>
//           </RFeature>
//         </RLayerVector>
//       </RMap>
//       <Link to={`/`} className="block mt-4 text-white hover:text-yellow-500">
//         Return to home page
//       </Link>
//     </>
//   );
// }

// export default Map;

// import { Link } from 'react-router-dom';

// const MapCars: React.FC = () => {
//   return (
//     <div className="h-screen pt-20">
//       <div className="container mx-auto py-20 grid gap-4 lg:grid-cols-5">
//         <h1 className="text-white">Map Cars</h1>
//         <Link to={`/`} className="block mt-4 text-white hover:text-yellow-500">
//           Return to home page
//         </Link>
//       </div>
//     </div>
//   );
// };
// export default MapCars;

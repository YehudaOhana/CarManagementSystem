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
import axios from 'axios';

const coords: Record<string, Coordinate> = {
  origin: [34.772, 32.089],
};

interface CarInterfaceCoordinate extends CarInterface {
  coordinates?: Coordinate;
}

function Map(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [geoCodedCars, setGeoCodedCars] = useState<CarInterfaceCoordinate[]>(
    []
  );
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const geoCodeLocation = async (location: string) => {
    try {
      const response = await axios.get(
        // change path to env
        `https://geocode.maps.co/search?q=${location}&api_key=65ac353ee1b42835870604gai352b14`,
        {
          timeout: 1000,
        }
      );

      // if (data.results && data.results.length > 0 && data.results[0].geometry) {
      const { lat, lon } = response.data[0];

      return fromLonLat([lon, lat]);
      // } else {
      //   console.error(`Geocoding failed for location: ${location}`);
      //   return null;
      // }
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
      const allCars = await tRPC.getAllCars.query(token);
      if (allCars !== 'Not Data' && allCars !== undefined) {
        const geoCodedCars = await Promise.all(
          allCars.map(async (car) => {
            console.log('car', car);

            const carCoordinates = await geoCodeLocation(car.location);
            console.log('kjck', carCoordinates);

            return carCoordinates
              ? {
                  ...car,
                  coordinates: carCoordinates,
                }
              : null;
          })
        );
        setGeoCodedCars(
          geoCodedCars.filter((car) => car !== null) as CarInterfaceCoordinate[]
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
  }, []);

  useEffect(() => {
    console.log('geo', geoCodedCars);
  }, [geoCodedCars]);
  return (
    <div className="py-20">
      <RMap
        className="w-full h-[1000px]"
        initial={{ center: fromLonLat(coords.origin), zoom: 11 }}
      >
        {/* <RLayerTile url="http://openmapsurfer.uni-hd.de/tiles/roads/x={x}&y={y}&z={z}" /> */}
        <RLayerTile url="http://mt0.google.com/vt/lyrs=m&hl=he&x={x}&y={y}&z={z}" />
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
      <Link to={`/`} className="block mt-4 text-yellow-500 hover:text-white">
        Return to home page
      </Link>
    </div>
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

import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import {
  RMap,
  ROSM,
  RLayerVector,
  RFeature,
  ROverlay,
  RStyle,
  RLayerTile,
} from 'rlayers';
import locationIcon from '../../images/locationIcon.png';
import { Link } from 'react-router-dom';

const coords: Record<string, Coordinate> = {
  origin: [34.772, 32.089],
  ArcDeTriomphe: [2.295, 48.8737],
};

function Map(): JSX.Element {
  return (
    <>
      <RMap
        className="w-full h-[1000px]"
        initial={{ center: fromLonLat(coords.origin), zoom: 11 }}
      >
        <RLayerTile url="http://mt0.google.com/vt/lyrs=m&hl=he&x={x}&y={y}&z={z}" />
        <RLayerVector zIndex={10}>
          <RStyle.RStyle>
            <RStyle.RIcon src={locationIcon} scale={0.08} anchor={[0.5, 0.8]} />
          </RStyle.RStyle>
          <RFeature
            geometry={new Point(fromLonLat(coords.ArcDeTriomphe))}
            // onClick={(e) =>
            //   e.map.getView().fit(e.target.getGeometry().getExtent(), {
            //     duration: 250,
            //     maxZoom: 15,
            //   })
            // }
          >
            <ROverlay className="example-overlay">
              Arc de Triomphe
              <br />
              <em>&#11017; click to zoom</em>
            </ROverlay>
          </RFeature>
        </RLayerVector>
      </RMap>
      <Link to={`/`} className="block mt-4 text-white hover:text-yellow-500">
        Return to home page
      </Link>
    </>
  );
}

export default Map;

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

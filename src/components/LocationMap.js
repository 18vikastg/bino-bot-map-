import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMap = ({ locationName, coordinates, places = [] }) => {
  return (
    <div className="map-container">
      <MapContainer 
        center={coordinates} 
        zoom={14} 
        style={{ height: '300px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {/* Default marker for the location */}
        <Marker position={coordinates}>
          <Popup>{locationName}</Popup>
        </Marker>

        {/* Additional markers for places (e.g., cafes) */}
        {places.map((place, index) => (
          <Marker key={index} position={place.coordinates}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LocationMap;
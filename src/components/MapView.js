import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for user location
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="12" fill="#EF4444" stroke="#ffffff" stroke-width="3"/>
      <circle cx="15" cy="15" r="6" fill="#ffffff"/>
    </svg>
  `),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
});

// Custom icon for places
const placeIcon = (index) => new L.Icon({
  iconUrl: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg width="25" height="35" viewBox="0 0 25 35" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 21.9 12.5 35 12.5 35S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="#3B82F6"/>
      <circle cx="12.5" cy="12.5" r="8" fill="#ffffff"/>
      <text x="12.5" y="16" text-anchor="middle" fill="#3B82F6" font-size="10" font-weight="bold">${index + 1}</text>
    </svg>
  `),
  iconSize: [25, 35],
  iconAnchor: [12.5, 35],
  popupAnchor: [0, -35]
});

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

export default function MapView({ center, userLocation, places, onLocationSelect }) {
  const geoapifyApiKey = process.env.REACT_APP_GEOAPIFY_API_KEY;

  const handleMapClick = (event) => {
    const location = {
      lat: event.latlng.lat,
      lng: event.latlng.lng
    };
    onLocationSelect(location);
  };

  return (
    <div className="map-view">
      <div className="map-header">
        <h3>🗺️ Map View</h3>
        <p>Click on map to set location • Red marker = You • Blue markers = Services</p>
      </div>
      
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={14}
        style={mapContainerStyle}
        eventHandlers={{
          click: handleMapClick
        }}
      >
        <TileLayer
          url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${geoapifyApiKey}`}
          attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* User location marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
          >
            <Popup>
              <div>
                <strong>📍 Your Location</strong>
                <p>Lat: {userLocation.lat.toFixed(4)}</p>
                <p>Lng: {userLocation.lng.toFixed(4)}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Places markers */}
        {places.map((place, index) => (
          <Marker
            key={index}
            position={[place.lat, place.lng]}
            icon={placeIcon(index)}
          >
            <Popup>
              <div className="info-window">
                <h4>{place.name}</h4>
                <p>{place.address}</p>
                {place.rating && (
                  <p>⭐ Rating: {place.rating.toFixed(1)}</p>
                )}
                {place.phone && (
                  <p>📞 {place.phone}</p>
                )}
                {place.website && (
                  <p><a href={place.website} target="_blank" rel="noopener noreferrer">🌐 Website</a></p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-marker user">🔴</span>
          <span>Your Location</span>
        </div>
        <div className="legend-item">
          <span className="legend-marker service">🔵</span>
          <span>Services Found ({places.length})</span>
        </div>
      </div>
    </div>
  );
}

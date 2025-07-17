import React from 'react';
import './LocationMap.css';

export default function LocationMap({ location, places = [] }) {
  return (
    <div className="location-map-container" style={{ height: '300px', width: '100%', margin: '10px 0' }}>
      <div className="map-placeholder">
        <div className="map-content">
          <h3>📍 {location?.name || 'Location'}</h3>
          {location && (
            <div className="location-info">
              <p><strong>Coordinates:</strong> {location.lat}, {location.lng}</p>
              {location.address && <p><strong>Address:</strong> {location.address}</p>}
            </div>
          )}
          
          {places && places.length > 0 && (
            <div className="places-list">
              <h4>🏢 Nearby Places:</h4>
              {places.map((place, index) => (
                <div key={index} className="place-item">
                  <strong>{place.name}</strong>
                  {place.rating && <span className="rating"> ⭐ {place.rating}</span>}
                  {place.type && <span className="type"> • {place.type}</span>}
                  {place.address && <p className="address">{place.address}</p>}
                </div>
              ))}
            </div>
          )}
          
          <p className="map-note">🗺️ Interactive map will load here</p>
        </div>
      </div>
    </div>
  );
}

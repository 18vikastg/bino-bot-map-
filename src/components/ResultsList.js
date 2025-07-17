import React from 'react';
import './ResultsList.css';

export default function ResultsList({ places, loading, userLocation }) {
  
  const calculateDistance = (place) => {
    if (!userLocation) return null;
    
    const R = 6371; // Earth's radius in km
    const dLat = (place.lat - userLocation.lat) * Math.PI / 180;
    const dLng = (place.lng - userLocation.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(place.lat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`;
  };

  const openDirections = (place) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
    window.open(url, '_blank');
  };

  const callPlace = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  if (loading) {
    return (
      <div className="results-list">
        <div className="results-header">
          <h3>🔍 Searching...</h3>
        </div>
        <div className="loading-results">
          <div className="loading-spinner"></div>
          <p>Finding the best places near you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-list">
      <div className="results-header">
        <h3>📍 Results ({places.length})</h3>
        {places.length > 0 && (
          <p>Sorted by distance from your location</p>
        )}
      </div>

      {places.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h4>No places found</h4>
          <p>Try selecting a different service or location</p>
        </div>
      ) : (
        <div className="results-grid">
          {places.map((place, index) => (
            <div key={index} className="result-card">
              <div className="result-header">
                <div className="result-number">{index + 1}</div>
                <div className="result-info">
                  <h4 className="result-name">{place.name}</h4>
                  <p className="result-address">{place.address}</p>
                </div>
              </div>

              <div className="result-details">
                {place.rating && (
                  <div className="result-rating">
                    ⭐ {place.rating} {place.user_ratings_total && `(${place.user_ratings_total})`}
                  </div>
                )}
                
                {userLocation && (
                  <div className="result-distance">
                    📍 {calculateDistance(place)} away
                  </div>
                )}

                {place.opening_hours && (
                  <div className={`result-status ${place.opening_hours.open_now ? 'open' : 'closed'}`}>
                    {place.opening_hours.open_now ? '🟢 Open' : '🔴 Closed'}
                  </div>
                )}
              </div>

              <div className="result-actions">
                <button 
                  onClick={() => openDirections(place)}
                  className="action-btn directions"
                >
                  🗺️ Directions
                </button>
                
                {place.phone && (
                  <button 
                    onClick={() => callPlace(place.phone)}
                    className="action-btn call"
                  >
                    📞 Call
                  </button>
                )}
              </div>

              {place.types && (
                <div className="result-types">
                  {place.types.slice(0, 3).map((type, i) => (
                    <span key={i} className="type-tag">
                      {type.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

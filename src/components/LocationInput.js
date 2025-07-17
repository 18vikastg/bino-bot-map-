import React, { useState } from 'react';
import './LocationInput.css';

export default function LocationInput({ userLocation, onLocationChange, mapCenter, onMapCenterChange }) {
  const [addressInput, setAddressInput] = useState('');
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          onLocationChange(location);
          onMapCenterChange(location);
          setLoading(false);
        },
        (error) => {
          console.error('Location error:', error);
          alert('Could not get your location. Please enter manually.');
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  const searchAddress = async () => {
    if (!addressInput.trim()) return;
    
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_GEOAPIFY_API_KEY;
      
      // Use Geoapify Geocoding API
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`
      );
      const data = await response.json();
      
      if (data && data.features && data.features.length > 0) {
        const location = {
          lat: data.features[0].geometry.coordinates[1],
          lng: data.features[0].geometry.coordinates[0]
        };
        onLocationChange(location);
        onMapCenterChange(location);
      } else {
        alert('Address not found. Please try a different address.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Error searching for address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="location-input">
      <h3>📍 Your Location</h3>
      
      <div className="location-status">
        {userLocation ? (
          <div className="location-found">
            ✅ Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </div>
        ) : (
          <div className="location-needed">
            📍 Location needed for search
          </div>
        )}
      </div>

      <div className="location-actions">
        <button 
          onClick={getCurrentLocation}
          disabled={loading}
          className="location-btn current-location"
        >
          {loading ? '🔄' : '📍'} {loading ? 'Getting Location...' : 'Use Current Location'}
        </button>
      </div>

      <div className="address-search">
        <div className="address-input-group">
          <input
            type="text"
            placeholder="Or enter an address..."
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchAddress()}
          />
          <button 
            onClick={searchAddress}
            disabled={loading || !addressInput.trim()}
            className="address-search-btn"
          >
            🔍
          </button>
        </div>
      </div>
    </div>
  );
}

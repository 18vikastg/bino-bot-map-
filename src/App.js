import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

// Service categories configuration matching the HTML example
const serviceCategories = [
  { value: 'flights', label: '✈️ Flight Booking', searchQuery: 'travel_agency' },
  { value: 'hotels', label: '🏨 Hotel Booking', searchQuery: 'lodging' },
  { value: 'taxis', label: '🚕 Taxi Booking', searchQuery: 'taxi_stand' },
  { value: 'bike_rental', label: '🏍️ Bike Rental', searchQuery: 'bicycle_store' },
  { value: 'car_rental', label: '🚗 Car Rental', searchQuery: 'car_rental' },
  { value: 'ac_repair', label: '❄️ AC Repair', searchQuery: 'electrician' },
  { value: 'car_repair', label: '🔧 Car Dent Repair', searchQuery: 'car_repair' },
  { value: 'sell_tv', label: '📺 Sell TV', searchQuery: 'electronics_store' },
  { value: 'sell_ac', label: '❄️ Sell AC', searchQuery: 'electronics_store' },
  { value: 'sell_bike', label: '🏍️ Sell Bike', searchQuery: 'bicycle_store' },
  { value: 'sell_car', label: '🚗 Sell Car', searchQuery: 'car_dealer' },
  { value: 'other', label: '🔍 Other Services', searchQuery: 'establishment' }
];

// Quick category buttons
const quickCategories = [
  { type: 'travel', category: 'flights', label: 'Book Travel', icon: 'fas fa-plane' },
  { type: 'whatsapp', category: '', label: 'WhatsApp Native', icon: 'fab fa-whatsapp' },
  { type: 'repair', category: 'ac_repair', label: 'Repair Services', icon: 'fas fa-tools' },
  { type: 'sell', category: 'sell_tv', label: 'Sell Items', icon: 'fas fa-tag' }
];

// Indian cities matching the HTML example
const cities = [
  'Bangalore', 'Chennai', 'Delhi', 'Mumbai', 'Hyderabad', 'Pune', 
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kochi', 'Chandigarh'
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [requirements, setRequirements] = useState('');
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]); // Default to Bangalore
  const [userLocation, setUserLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const whatsappBotNumber = '919800081110';

  // Fix Leaflet default markers
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });

  // Custom icons for different types
  const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const businessIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Effect to find nearby services when category and city are selected
  useEffect(() => {
    const findNearbyServices = async () => {
      if (!selectedCategory || !selectedCity) {
        setNearbyPlaces([]);
        setShowMap(false);
        return;
      }

      setLoading(true);
      try {
        // First get the city coordinates
        const cityResponse = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(selectedCity)}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
        );
        const cityData = await cityResponse.json();
        
        if (cityData.features && cityData.features.length > 0) {
          const location = {
            lat: cityData.features[0].geometry.coordinates[1],
            lng: cityData.features[0].geometry.coordinates[0]
          };

          // Update map center and user location
          setMapCenter([location.lat, location.lng]);
          setUserLocation(location);
          setShowMap(true);

          // Then search for services
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/search`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: selectedCategory,
              location: location,
              radius: 10000
            }),
          });

          const data = await response.json();
          
          if (data.success && data.places) {
            setNearbyPlaces(data.places);
          }
        }
      } catch (error) {
        console.error('Error finding services:', error);
      } finally {
        setLoading(false);
      }
    };

    findNearbyServices();
  }, [selectedCategory, selectedCity]);

  // Update preview when form changes
  useEffect(() => {
    if (selectedCategory && selectedCity) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  }, [selectedCategory, selectedCity, requirements]);

  const generateSmartMessage = () => {
    if (!selectedCategory || !selectedCity) return '';
    
    const categoryLabels = {
      'flights': 'flight booking',
      'hotels': 'hotel booking', 
      'taxis': 'taxi booking',
      'bike_rental': 'bike rental',
      'car_rental': 'car rental',
      'ac_repair': 'AC repair',
      'car_repair': 'car dent repair',
      'sell_tv': 'sell my TV',
      'sell_ac': 'sell my AC',
      'sell_bike': 'sell my bike',
      'sell_car': 'sell my car',
      'other': 'other services'
    };

    let message = `New Search\n\nI need help with ${categoryLabels[selectedCategory] || selectedCategory} in ${selectedCity}.`;
    
    if (requirements.trim()) {
      message += `\n\nSpecific requirements: ${requirements}`;
    }
    
    message += `\n\nPlease help me find the best options available.`;
    return message;
  };

  const handleQuickCategory = (type, category) => {
    if (type === 'whatsapp') {
      window.open(`https://wa.me/${whatsappBotNumber}?text=New%20Search%0A%0AHi%20Bino!%20I%20need%20help%20finding%20services.`, '_blank');
      return;
    }
    setSelectedCategory(category);
  };

  const sendToWhatsApp = () => {
    const message = generateSmartMessage();
    const whatsappURL = `https://wa.me/${whatsappBotNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const contactBusiness = (place) => {
    const message = `Hi! I found your business "${place.name}" through Bino search. I'm interested in your ${selectedCategory} services in ${selectedCity}. Can you help me?`;
    // For demo purposes, we'll use a general number. In real app, you'd use place.phone
    const whatsappURL = `https://wa.me/${whatsappBotNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const clearForm = () => {
    setSelectedCategory('');
    setSelectedCity('');
    setRequirements('');
    setNearbyPlaces([]);
    setShowPreview(false);
    setShowMap(false);
    setUserLocation(null);
    setMapCenter([12.9716, 77.5946]); // Reset to default Bangalore coordinates
  };

  return (
    <div className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Find<span className="hero-highlight">Anything</span><br/>Anywhere
          </h1>
          <p className="hero-subtitle">
            Your intelligent <span className="hero-highlight">WhatsApp search assistant</span> that connects you with businesses, services, and opportunities worldwide.
          </p>
        </div>

        <div className="main-card">
          <div className="card-header">
            <h2 className="card-title">🔍 Bino Service Helper</h2>
            <p className="card-subtitle">Find nearby services and connect instantly via WhatsApp!</p>
          </div>

          <div className="features-grid">
            {quickCategories.map((item, index) => (
              <div 
                key={index}
                className="feature-item" 
                onClick={() => handleQuickCategory(item.type, item.category)}
              >
                <div className="feature-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="feature-text">{item.label}</div>
              </div>
            ))}
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-layer-group"></i>
                Service Category
              </label>
              <div className="select-wrapper">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select service type...</option>
                  {serviceCategories.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-map-marker-alt"></i>
                Your location
              </label>
              <div className="select-wrapper">
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select city...</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      🌆 {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-map-pin"></i>
                Specific Requirements (Optional)
              </label>
              <input 
                type="text"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="form-input"
                placeholder="e.g., Budget range, specific dates, preferences..."
                maxLength="100"
              />
            </div>

            <div className="button-group">
              <button 
                type="button"
                onClick={sendToWhatsApp}
                className="btn btn-primary pulse"
                disabled={!selectedCategory || !selectedCity}
              >
                <i className="fab fa-whatsapp"></i>
                Send Complete Message
              </button>
              <button 
                type="button"
                onClick={clearForm}
                className="btn btn-secondary"
              >
                <i className="fas fa-refresh"></i>
                Clear
              </button>
            </div>
          </form>

          {loading && (
            <div className="status-message status-loading" style={{display: 'block'}}>
              <div className="loading-spinner"></div>
              Finding nearby services...
            </div>
          )}

          {showPreview && (
            <div className="whatsapp-preview show">
              <div className="whatsapp-header">
                <i className="fab fa-whatsapp whatsapp-icon"></i>
                <span className="whatsapp-title">Your Complete Message</span>
              </div>
              <div className="whatsapp-message">
                {generateSmartMessage()}
              </div>
            </div>
          )}

          {showMap && userLocation && (
            <div className="map-container">
              <h3 className="map-title">
                <i className="fas fa-map-marked-alt"></i>
                Map View - {selectedCity}
              </h3>
              <MapContainer 
                center={mapCenter} 
                zoom={13} 
                style={{ height: '400px', width: '100%', borderRadius: '12px' }}
              >
                <TileLayer
                  url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`}
                  attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* User location marker */}
                <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                  <Popup>
                    <div>
                      <strong>📍 Your Location</strong><br />
                      {selectedCity}
                    </div>
                  </Popup>
                </Marker>

                {/* Business markers */}
                {nearbyPlaces.map((place, index) => (
                  place.coordinates && (
                    <Marker 
                      key={index} 
                      position={[place.coordinates.lat, place.coordinates.lng]} 
                      icon={businessIcon}
                    >
                      <Popup>
                        <div>
                          <strong>{place.name}</strong><br />
                          <p style={{margin: '5px 0', fontSize: '12px'}}>{place.address}</p>
                          {place.rating && (
                            <p style={{margin: '5px 0', fontSize: '12px'}}>
                              ⭐ {place.rating}/5
                            </p>
                          )}
                          <button 
                            onClick={() => contactBusiness(place)}
                            style={{
                              background: '#25d366',
                              color: 'white',
                              border: 'none',
                              padding: '5px 10px',
                              borderRadius: '5px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              marginTop: '5px'
                            }}
                          >
                            <i className="fab fa-whatsapp"></i> Contact
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  )
                ))}
              </MapContainer>
            </div>
          )}

          {nearbyPlaces.length > 0 && (
            <div className="nearby-services">
              <h3 className="services-title">
                <i className="fas fa-map-marker-alt"></i>
                Nearby {serviceCategories.find(s => s.value === selectedCategory)?.label} in {selectedCity}
              </h3>
              <div className="services-list">
                {nearbyPlaces.slice(0, 5).map((place, index) => (
                  <div key={index} className="service-item">
                    <div className="service-info">
                      <h4 className="service-name">{place.name}</h4>
                      <p className="service-address">{place.address}</p>
                      {place.rating && (
                        <div className="service-rating">
                          <span className="rating-stars">{'★'.repeat(Math.floor(place.rating))}</span>
                          <span className="rating-number">({place.rating})</span>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => contactBusiness(place)}
                      className="contact-btn"
                    >
                      <i className="fab fa-whatsapp"></i>
                      Contact
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="footer">
            <p className="footer-text">
              <i className="fas fa-bolt"></i>
              Powered by <span className="footer-logo">Bino</span> Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
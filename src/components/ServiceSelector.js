import React from 'react';
import './ServiceSelector.css';

const services = [
  { id: 'restaurants', name: '🍽️ Restaurants', icon: '🍽️' },
  { id: 'hospitals', name: '🏥 Hospitals', icon: '🏥' },
  { id: 'pharmacies', name: '💊 Pharmacies', icon: '💊' },
  { id: 'gas_stations', name: '⛽ Gas Stations', icon: '⛽' },
  { id: 'banks', name: '🏦 Banks', icon: '🏦' },
  { id: 'atms', name: '🏧 ATMs', icon: '🏧' },
  { id: 'supermarkets', name: '🛒 Supermarkets', icon: '🛒' },
  { id: 'shopping_malls', name: '🏬 Shopping Malls', icon: '🏬' },
  { id: 'gyms', name: '💪 Gyms', icon: '💪' },
  { id: 'beauty_salons', name: '💄 Beauty Salons', icon: '💄' },
  { id: 'car_repair', name: '🔧 Car Repair', icon: '🔧' },
  { id: 'electronics', name: '📱 Electronics', icon: '📱' }
];

export default function ServiceSelector({ selectedService, onServiceChange }) {
  return (
    <div className="service-selector">
      <h3>What are you looking for?</h3>
      <div className="services-grid">
        {services.map(service => (
          <button
            key={service.id}
            className={`service-btn ${selectedService === service.id ? 'active' : ''}`}
            onClick={() => onServiceChange(service.id)}
          >
            <span className="service-icon">{service.icon}</span>
            <span className="service-name">{service.name.replace(/🔧|🏥|💊|⛽|🏦|🏧|🛒|🏬|💪|💄|🍽️|📱/g, '')}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

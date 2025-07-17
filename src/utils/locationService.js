import { detectLocation } from './locationDetector';
import { searchPlaces } from './geoapify';

export async function getLocationResults(userInput) {
  const location = detectLocation(userInput);
  if (!location) return null;
  
  const places = await searchPlaces({
    lat: location.lat,
    lng: location.lng,
    categories: 'commercial.gym' 
  });
  
  return { location, places };
}
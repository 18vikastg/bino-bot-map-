import { detectLocation } from '../utils/locationDetector';
import { searchPlaces } from '../utils/geoapify';

export default function useLocationSearch() {
  const handleLocationQuery = async (userInput) => {
    const location = detectLocation(userInput);
    if (!location) return null;
    
    const places = await searchPlaces({
      lat: location.lat,
      lng: location.lng,
      categories: 'commercial.gym' 
    });
    
    return { location, places };
  };

  return { handleLocationQuery };
}
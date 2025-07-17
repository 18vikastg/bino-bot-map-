const API_KEY = import.meta.env.VITE_GEOAPIFY_KEY || 'YOUR_KEY';

export async function searchPlaces(options) {
  const {
    lat,
    lng,
    radius = 1000, // meters
    categories = 'catering.cafe', // See https://apidocs.geoapify.com/docs/places/#categories
    limit = 5
  } = options;

  try {
    const response = await fetch(
      `https://api.geoapify.com/v2/places?` +
      `categories=${categories}&` +
      `filter=circle:${lng},${lat},${radius}&` +
      `limit=${limit}&` +
      `apiKey=${API_KEY}`
    );

    if (!response.ok) throw new Error('API request failed');

    const { features } = await response.json();
    
    return features.map(feature => ({
      name: feature.properties.name,
      address: feature.properties.formatted,
      coordinates: [feature.properties.lat, feature.properties.lon],
      category: feature.properties.categories[0]
    }));
  } catch (error) {
    console.error('Geoapify error:', error);
    return []; // Fail gracefully
  }
}

// Example usage:
// searchPlaces({ lat: 12.9352, lng: 77.6245, categories: 'commercial.gym' });
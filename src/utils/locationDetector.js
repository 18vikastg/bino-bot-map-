// Predefined locations database (expand as needed)
const LOCATION_DATABASE = {
  // Bangalore
  'koramangala': { lat: 12.9352, lng: 77.6245, aliases: ['kormangala'] },
  'indiranagar': { lat: 12.9784, lng: 77.6408, aliases: ['indira nagar'] },
  'hsr layout': { lat: 12.9115, lng: 77.6446, aliases: ['hsr'] },
  
  // Mumbai
  'bandra': { lat: 19.0556, lng: 72.8402 },
  
  // Add more cities/neighborhoods
};

export function detectLocation(text) {
  const normalizedText = text.toLowerCase();
  
  // 1. Check exact matches first
  for (const [location, data] of Object.entries(LOCATION_DATABASE)) {
    if (
      normalizedText.includes(location) ||
      data.aliases?.some(alias => normalizedText.includes(alias))
    ) {
      return {
        name: location,
        lat: data.lat,
        lng: data.lng,
        exactMatch: true
      };
    }
  }

  // 2. Fuzzy matching (simple version)
  const words = normalizedText.split(/\s+/);
  for (const word of words) {
    if (LOCATION_DATABASE[word]) {
      return {
        name: word,
        ...LOCATION_DATABASE[word],
        exactMatch: false
      };
    }
  }

  return null;
}

// Example usage:
// detectLocation("Where's the nearest cafe in koramangala?");
// components/LocationSuggestions.js
function LocationSuggestions({ onSelect }) {
  const popularLocations = [
    { name: "Koramangala", coords: [12.9352, 77.6245] },
    { name: "Indiranagar", coords: [12.9784, 77.6408] }
  ];

  return (
    <div className="suggestions">
      {popularLocations.map((loc, i) => (
        <button key={i} onClick={() => onSelect(loc.name)}>
          {loc.name}
        </button>
      ))}
    </div>
  );
}
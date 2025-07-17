import LocationMap from './LocationMap';

const ChatMessage = ({ message }) => {
  // Example: When the bot responds with location data
  if (message.type === 'location') {
    return (
      <div className="bot-message">
        <p>{message.text}</p>
        <LocationMap 
          locationName={message.locationName} 
          coordinates={message.coordinates}
          places={message.places} // Optional: Array of {name: "Cafe XYZ", coordinates: [lat, lng]}
        />
      </div>
    );
  }

  // Regular text message
  return <div className={`message ${message.sender}`}>{message.text}</div>;
};
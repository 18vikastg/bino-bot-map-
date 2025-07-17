import LocationMap from './LocationMap'; // You'll create this

export default function ChatMessages({ messages }) {
  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender}`}>
          <div className="message-content">
            {message.text}
            {message.type === 'location' && (
              <LocationMap 
                location={message.location} 
                places={message.places} 
              />
            )}
          </div>
          <div className="message-time">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
}
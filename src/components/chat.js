// components/Chat.js
import { useState, useEffect } from 'react';
import { detectLocation } from '../utils/locationDetector';
import { fetchPlaces } from '../utils/geoapify';
import LocationMap from './LocationMap';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    // Bot response logic
    const location = detectLocation(input);
    if (location) {
      const places = await fetchPlaces(location.lat, location.lng);
      setMessages(prev => [...prev, {
        type: 'location',
        text: `Here are places in ${location.name}:`,
        locationName: location.name,
        coordinates: [location.lat, location.lng],
        places
      }]);
    } else {
      setMessages(prev => [...prev, { text: "I couldn't find that location", sender: 'bot' }]);
    }

    setInput('');
  };

  return (
    <div className="chat-container">
      {/* Message history */}
      {messages.map((msg, i) => (
        msg.type === 'location' ? (
          <div key={i} className="bot-message">
            <p>{msg.text}</p>
            <LocationMap {...msg} />
          </div>
        ) : (
          <div key={i} className={`message ${msg.sender}`}>{msg.text}</div>
        )
      ))}

      {/* Input box */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
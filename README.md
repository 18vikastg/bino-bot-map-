# 🔍 Bino Bot Map - Smart Location Service Finder

A modern React web application that helps users find nearby services and connect with businesses instantly via WhatsApp. Built with interactive maps, location-based search, and a beautiful professional UI.

## 🌟 Features

### 🎯 Core Functionality
- **Smart Service Discovery**: Find restaurants, hotels, hospitals, shops, and more
- **Interactive Maps**: Visual representation of your location and nearby businesses
- **WhatsApp Integration**: Direct contact with businesses via WhatsApp
- **Location-Based Search**: Search across major Indian cities
- **Real-time Results**: Live data from Geoapify API

### 🎨 Modern UI/UX
- **Professional Design**: Clean, modern interface with gradient themes
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth animations and hover effects
- **Dark/Light Theme**: Professional color schemes
- **Font Awesome Icons**: Beautiful iconography throughout

### 🗺️ Map Features
- **Interactive Leaflet Maps**: High-quality map visualization
- **Custom Markers**: Distinct icons for user location and businesses
- **Business Popups**: Detailed information cards on map markers
- **Zoom Controls**: Easy navigation and exploration
- **Multiple Map Tiles**: Professional map styling

## 🚀 Live Demo

[Deploy on Vercel](https://vercel.com) - Connect your GitHub repository for instant deployment

## 🛠️ Technologies Used

### Frontend
- **React.js 19.1.0** - Modern JavaScript framework
- **Leaflet & React-Leaflet** - Interactive mapping library
- **CSS3** - Advanced styling with gradients and animations
- **Font Awesome** - Professional icon library

### APIs & Services
- **Geoapify API** - Location services and geocoding
- **WhatsApp Business API** - Direct messaging integration
- **OpenStreetMap** - Map tile services

### Development Tools
- **Create React App** - React development environment
- **VS Code** - Development IDE
- **Git & GitHub** - Version control
- **npm** - Package management

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Geoapify API Key** (free at [geoapify.com](https://geoapify.com))
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/18vikastg/bino-bot-map-.git
cd bino-bot-map-
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
REACT_APP_GEOAPIFY_API_KEY=your_geoapify_api_key_here
```

### 4. Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🔧 Configuration

### Geoapify API Setup
1. Visit [geoapify.com](https://geoapify.com)
2. Create a free account
3. Generate an API key
4. Add the key to your `.env` file

### WhatsApp Integration
- Default bot number: `+91 98000 81110`
- Modify in `src/App.js` to use your business number
- Supports custom message templates

## 📁 Project Structure

```
bino-bot-map/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js          # Main React component
│   ├── App.css         # Professional styling
│   ├── index.js        # React DOM entry point
│   └── index.css       # Global styles
├── package.json        # Dependencies and scripts
├── .env               # Environment variables
└── README.md          # This file
```

## 🎯 Usage Guide

### 1. Service Search
- Select a service category (restaurants, hotels, etc.)
- Choose your city from the dropdown
- Add specific requirements (optional)
- Click "Send Complete Message" for WhatsApp

### 2. Map Interaction
- View your location marker (blue)
- See nearby businesses (red markers)
- Click markers for business details
- Use zoom controls for navigation

### 3. Business Contact
- Click "Contact" buttons to message businesses
- Pre-formatted WhatsApp messages
- Direct connection to business owners

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Push code to GitHub
2. Connect Vercel to your repository
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Build
```bash
npm run build
```
Deploy the `build` folder to any hosting service.

## 🌍 Supported Locations

Currently supports major Indian cities:
- Mumbai, Delhi, Bangalore, Chennai
- Hyderabad, Pune, Kolkata, Ahmedabad
- Jaipur, Surat, Lucknow, Kanpur
- Nagpur, Visakhapatnam, Indore, Thane
- Bhopal, Patna, Vadodara, Ghaziabad

## 🔌 API Integration

### Geoapify Features Used
- **Geocoding**: Convert addresses to coordinates
- **Places API**: Find nearby businesses
- **Map Tiles**: High-quality map rendering
- **Reverse Geocoding**: Get addresses from coordinates

### Rate Limits
- Free tier: 3,000 requests/day
- Upgrade for higher limits
- Implements error handling for API limits

## 🎨 Customization

### Color Themes
Modify CSS variables in `App.css`:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #25d366;
}
```

### Adding New Cities
Update the `cities` array in `App.js`:
```javascript
const cities = [
  // Add new cities here
  'Your City Name'
];
```

### Service Categories
Extend `serviceCategories` in `App.js`:
```javascript
const serviceCategories = [
  { value: 'new-service', label: 'New Service' }
];
```

## 🐛 Troubleshooting

### Common Issues

**Map not loading**
- Check Geoapify API key
- Verify internet connection
- Check browser console for errors

**Location not found**
- Ensure city is in supported list
- Check spelling of location
- Try different nearby city

**WhatsApp not opening**
- Check if WhatsApp is installed
- Verify phone number format
- Test on different device

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Vikas TG**
- GitHub: [@18vikastg](https://github.com/18vikastg)
- Project: [bino-bot-map-](https://github.com/18vikastg/bino-bot-map-)

## 🙏 Acknowledgments

- **Geoapify** for location services
- **Leaflet** for mapping functionality
- **React** community for excellent documentation
- **OpenStreetMap** for map data
- **Font Awesome** for beautiful icons

## 📈 Future Enhancements

- [ ] User authentication system
- [ ] Favorites and bookmarks
- [ ] Review and rating system
- [ ] Advanced search filters
- [ ] Multiple language support
- [ ] Offline functionality
- [ ] Business owner dashboard

---

**Built with ❤️ using React.js and modern web technologies**

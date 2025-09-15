# Karnataka Agricultural App UI

A comprehensive smart farming platform designed specifically for Karnataka farmers, featuring AI-powered crop predictions, soil analysis, and district-specific insights.

## 🌟 Features

### Authentication System
- **Separate Sign-In Page**: Dedicated login/signup interface
- **User-Specific Data**: Each user sees only their own data
- **Protected Routes**: Secure access to dashboard features
- **Demo Accounts**: Pre-configured accounts for testing

### Dashboard Sections
- **Home**: Overview with market prices, weather, and crop recommendations
- **Crops**: Detailed crop information and recommendations
- **Soil & Diseases**: Interactive Karnataka map with district-specific data
- **AI Predictions**: Personalized crop recommendations based on user inputs
- **Profile**: User profile management with farming history and achievements

### Karnataka Map Integration
- **31 Districts**: Complete coverage of all Karnataka districts
- **Interactive Features**: Click on districts to view detailed information
- **User District Highlighting**: Your district is highlighted in green
- **Comprehensive Data**: Soil type, rainfall, temperature, crops, and industries

### User-Specific Features
- **Personalized Dashboard**: Data tailored to user's district and preferences
- **Farming History**: Track past crops, yields, and profits
- **Achievements**: Badges and recognition for farming milestones
- **Settings**: Customizable notifications and preferences

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd karnataka-agricultural-app-ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔐 Demo Accounts

For testing purposes, the following demo accounts are available:

| Email | Password | District | Farm Type |
|-------|----------|----------|-----------|
| rajesh.gowda@gmail.com | password123 | Mandya | Mixed Farming |
| priya.sharma@gmail.com | password123 | Mysore | Organic Farming |
| kumar.reddy@gmail.com | password123 | Bangalore Rural | Commercial Farming |

## 🗺️ Karnataka Districts

The application includes comprehensive data for all 31 districts of Karnataka:

### Northern Karnataka
- Belgaum, Hubli-Dharwad, Gulbarga, Bijapur, Bellary, Raichur, Koppal, Gadag, Haveri, Bagalkot, Vijayapura, Yadgir

### Central Karnataka
- Bangalore Rural, Bangalore Urban, Tumkur, Chitradurga, Davanagere, Kolar, Chikballapur, Ramanagara

### Southern Karnataka
- Mysore, Hassan, Mandya, Shimoga, Chikmagalur, Kodagu, Chamarajanagar

### Coastal Karnataka
- Uttara Kannada, Dakshina Kannada, Udupi

## 🏗️ Architecture

### Components Structure
```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── AuthModal.tsx       # Authentication modal
│   ├── Dashboard.tsx       # Main dashboard
│   ├── KarnatakaMap.tsx    # Interactive map component
│   ├── ProfileSection.tsx  # User profile management
│   ├── SoilInsights.tsx    # Soil and disease analysis
│   └── AIPredictions.tsx   # AI crop recommendations
├── contexts/
│   └── AuthContext.tsx     # Authentication state management
├── pages/
│   ├── HomePage.tsx        # Landing page
│   ├── SignInPage.tsx      # Authentication page
│   └── DashboardPage.tsx   # Main application dashboard
└── App.tsx                 # Main application component
```

### Key Features

#### Authentication Context
- User state management
- Login/signup functionality
- Protected route handling
- User data persistence

#### Interactive Map
- SVG-based Karnataka map
- District-specific data
- User location highlighting
- Comprehensive district information

#### User-Specific Data
- Personalized dashboard
- District-based recommendations
- Individual farming history
- Customizable preferences

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Interface**: Clean, intuitive design with smooth animations
- **Accessibility**: Keyboard navigation and screen reader support
- **Multi-language**: Support for Kannada, English, and Hindi
- **Dark/Light Mode**: Theme switching capability

## 🔧 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

## 📱 Mobile Support

The application is fully responsive and optimized for mobile devices:
- Touch-friendly interface
- Mobile navigation menu
- Optimized layouts for small screens
- Fast loading and smooth performance

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Karnataka State Government for agricultural data
- Local farmers for insights and feedback
- Open source community for tools and libraries

## 📞 Support

For support and questions:
- Email: support@karnatakkrishi.com
- Phone: +91-80-XXXX-XXXX
- Website: https://karnatakkrishi.com

---

**Built with ❤️ for Karnataka Farmers**
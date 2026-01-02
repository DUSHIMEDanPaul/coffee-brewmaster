<<<<<<< HEAD
# ☕ BrewMaster

<div align="center">

![BrewMaster Banner](https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200&h=400)

**A Premium Coffee Exploration Platform with AI-Powered Intelligence**

[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google AI](https://img.shields.io/badge/Google_AI-Gemini-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Overview

**BrewMaster** is a sophisticated, enterprise-grade coffee marketplace and exploration platform that bridges the gap between coffee enthusiasts, specialty roasters, and sustainable farmers. Built with modern web technologies and powered by Google's Gemini AI, BrewMaster delivers an immersive experience for discovering, learning about, and purchasing premium coffee from around the world.

### 🎯 Key Highlights

- **AI-Powered Coffee Sommelier**: Intelligent chat assistant providing personalized recommendations and brewing guidance
- **Real-Time Order Tracking**: Advanced logistics visualization with global transit monitoring
- **Seller Analytics Dashboard**: Comprehensive business intelligence with demand forecasting
- **Voice-Enabled Shopping**: Hands-free browsing and ordering through voice commands
- **Blockchain-Ready**: Transparent supply chain tracking from farm to cup
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

---

## ✨ Features

### For Coffee Enthusiasts

#### 🤖 AI-Powered Coffee Assistant
- **Smart Recommendations**: Personalized coffee suggestions based on taste preferences and brewing methods
- **Interactive Chat**: Natural language conversations about coffee origins, brewing techniques, and flavor profiles
- **Voice Shopping**: Browse and order coffee using voice commands with real-time speech recognition
- **Educational Content**: Learn about coffee regions, processing methods, and sustainability practices

#### 🛒 Premium Shopping Experience
- **Curated Collections**: Handpicked selection of specialty coffees from renowned origins
- **Detailed Product Information**: Comprehensive details including altitude, washing stations, flavor profiles, and farmer stories
- **Origin Stories**: Explore the journey of each coffee from farm to roaster
- **Interactive Maps**: Visualize coffee origins with precise geolocation data
- **Real-Time Inventory**: Live stock availability and delivery estimates

#### 📦 Advanced Order Management
- **Live Tracking**: Real-time shipment monitoring with GPS precision
- **Transit Visualization**: Beautiful animated progress indicators showing each stage of delivery
- **Environmental Monitoring**: Track temperature and humidity conditions during transit
- **Delivery Notifications**: Instant updates at every milestone

### For Coffee Sellers

#### 📊 Business Intelligence Dashboard
- **Revenue Analytics**: Comprehensive financial tracking with trend analysis
- **Order Management**: Efficient order processing and fulfillment workflows
- **Inventory Control**: Manage coffee listings with rich product data
- **AI Insights**: Google Gemini-powered business recommendations and demand forecasting
- **Performance Metrics**: Track key performance indicators across multiple time granularities (hourly, daily, weekly, monthly, yearly)

#### 🚀 Seller Tools
- **Product Management**: Add, edit, and manage coffee listings with detailed specifications
- **Order Logistics**: Control shipment stages with stage transition authorization
- **Customer Communication**: Integrated messaging for customer support
- **Analytics Visualization**: Interactive charts and graphs for data-driven decisions

### 🔐 Security & Authentication
- **Secure Authentication**: Role-based access control (buyers and sellers)
- **User Profiles**: Personalized dashboards with order history
- **Protected Routes**: Secure API endpoints and data protection
- **Session Management**: Persistent authentication state

---

## 🛠 Tech Stack

### Frontend Core
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.3 | Component-based UI framework |
| **Vite** | 6.2.0 | Next-generation build tool and dev server |
| **TailwindCSS** | 3.4.17 | Utility-first CSS framework |
| **PostCSS** | 8.4.49 | CSS processing and optimization |
| **Autoprefixer** | 10.4.20 | CSS vendor prefixing |

### AI & Machine Learning
| Technology | Version | Purpose |
|------------|---------|---------|
| **Google Gemini AI** | 1.34.0 | Natural language processing, recommendations, and business insights |
| **@google/genai** | 1.34.0 | Official Google AI SDK for multimodal interactions |

### Development Tools
| Tool | Purpose |
|------|---------|
| **ES Modules** | Modern JavaScript module system |
| **JSConfig** | JavaScript project configuration |
| **Type Definitions** | JSDoc type annotations for better IDE support |

### Design & UX
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Custom Animations**: CSS animations and transitions for fluid interactions
- **SVG Graphics**: Scalable vector icons and illustrations
- **Modern Typography**: Serif and sans-serif font combinations
- **Color System**: Carefully crafted palette inspired by coffee tones

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Google AI API Key** - [Get one here](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/coffee-brewmaster.git
   cd coffee-brewmaster
   ```

2. **Navigate to the BrewMaster directory**
   ```bash
   cd BrewMaster
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   or with yarn:
   ```bash
   yarn install
   ```

4. **Configure environment variables**
   
   Create a `.env.local` file in the `BrewMaster` directory:
   ```bash
   touch .env.local
   ```
   
   Add your Google AI API key:
   ```env
   API_KEY=your_google_ai_api_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

Preview the production build locally before deployment.

---

## 🏗 Architecture

### Project Structure

```
BrewMaster/
├── components/               # React components
│   ├── AddCoffeeModal.jsx   # Seller product management
│   ├── BottomNav.jsx        # Mobile navigation
│   ├── CoffeeTile.jsx       # Product card component
│   ├── Navbar.jsx           # Top navigation bar
│   ├── OriginStoryModal.jsx # Coffee origin details
│   ├── VerificationModal.jsx # Blockchain verification
│   └── VoiceChatModal.jsx   # Voice-powered shopping
├── pages/                   # Page components
│   ├── LoginPage.jsx        # Authentication
│   └── SignupPage.jsx       # User registration
├── services/                # API and external services
│   └── geminiService.js     # Google AI integration
├── src/                     # Styles and assets
│   └── index.css           # Global styles
├── App.jsx                  # Main application component
├── constants.jsx            # Coffee data and configurations
├── types.js                 # Type definitions (JSDoc)
├── index.jsx               # Application entry point
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── jsconfig.json           # JavaScript configuration
├── metadata.json           # App metadata
└── package.json            # Dependencies and scripts
```

### Component Architecture

```
App.jsx (Root)
├── Authentication Layer
│   ├── LoginPage
│   └── SignupPage
├── User Dashboard (Buyer)
│   ├── Navbar
│   ├── CoffeeTile (Grid)
│   ├── OriginStoryModal
│   ├── VoiceChatModal
│   ├── OrderLogisticsView
│   └── BottomNav
└── Seller Dashboard
    ├── Analytics View
    │   ├── InsightMetrics
    │   └── VelocityChart
    ├── Orders View
    │   └── OrderLogisticsView
    └── Listings View
        └── AddCoffeeModal
```

### Data Flow

1. **State Management**: React useState and useEffect hooks for local state
2. **Props Drilling**: Component composition with props for data passing
3. **Memoization**: useMemo and useCallback for performance optimization
4. **API Integration**: Async/await patterns with error handling
5. **Real-time Updates**: Optimistic UI updates with instant feedback

---

## 📖 Documentation

### Core Concepts

#### Coffee Data Model

Each coffee product contains:

```javascript
{
  id: string,              // Unique identifier
  name: string,            // Coffee name
  price: number,           // USD price per unit
  origin: string,          // Geographic origin
  description: string,     // Short description
  originStory: string,     // Detailed backstory
  image: string,           // Product image URL
  category: string,        // Product category
  rating: number,          // User rating (0-5)
  sustainabilityScore: number, // Environmental score
  latLng: object,          // GPS coordinates
  flavorProfile: string,   // Flavor category
  washingStation: string,  // Processing facility
  altitude: number,        // Growing elevation (meters)
  isRoasted: boolean,      // Roasting status
  publishedAt: string      // ISO timestamp
}
```

#### User Roles

- **Buyer**: Browse coffee, place orders, track shipments, chat with AI
- **Seller**: Manage inventory, process orders, view analytics, add products

#### AI Integration

The platform uses Google's Gemini AI for:

1. **Coffee Recommendations**: Personalized suggestions based on user preferences
2. **Chat Support**: Natural language Q&A about coffee
3. **Business Insights**: Seller analytics and demand forecasting
4. **Voice Commands**: Speech-to-text for hands-free shopping

### API Reference

#### Gemini Service

```javascript
// Get AI chat response
getCoffeeChatResponse(message, history)
  → Returns: AsyncGenerator<StreamedResponse>

// Get business insights for sellers
getSellerBusinessInsights(salesSummary)
  → Returns: Promise<string>

// Live voice interaction
initializeLiveSession(config)
  → Returns: LiveSession
```

### Configuration

#### Tailwind Configuration

Custom theme extending default Tailwind with coffee-inspired colors:

```javascript
theme: {
  extend: {
    colors: {
      coffee: {
        dark: '#3d2b1f',
        medium: '#8b5e3c',
        light: '#d4a574'
      }
    }
  }
}
```

#### Vite Configuration

Optimized for React with fast refresh:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
```

---

## 🎨 Design System

### Color Palette

- **Primary**: `#3d2b1f` (Deep Coffee Brown)
- **Secondary**: `#8b5e3c` (Roasted Coffee)
- **Accent**: `#1a434d` (Ocean Teal)
- **Background**: `#fcfaf9` (Cream)
- **Text**: `#000000` (Black) / `#ffffff` (White)

### Typography

- **Headings**: Serif font family for elegance
- **Body**: Sans-serif for readability
- **Monospace**: For technical details and timestamps

### Spacing System

Following 8px baseline grid with Tailwind's spacing scale

---

## 🔒 Security Considerations

- **Environment Variables**: API keys stored securely in `.env.local`
- **Input Validation**: Form validation on client and server
- **XSS Protection**: React's built-in escaping
- **HTTPS**: Enforce secure connections in production
- **Rate Limiting**: API request throttling (implement on backend)

---

## 🚀 Deployment

### Recommended Platforms

- **Vercel**: Zero-config deployment with automatic HTTPS
- **Netlify**: Continuous deployment with form handling
- **Cloudflare Pages**: Global CDN with edge functions
- **AWS Amplify**: Full-stack hosting with CI/CD

### Environment Variables in Production

Set the following in your hosting platform:

```env
API_KEY=your_production_google_ai_api_key
```

### Build Command

```bash
npm run build
```

### Output Directory

```
dist/
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Code Standards

- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Coffee Imagery**: [Unsplash](https://unsplash.com/) contributors
- **Google AI Team**: For the powerful Gemini API
- **React Community**: For exceptional tools and libraries
- **Coffee Farmers**: For their dedication to sustainable practices

---

## 📧 Contact & Support

- **Project Repository**: [github.com/yourusername/coffee-brewmaster](https://github.com/DUSHIMEDanPaul/coffee-brewmaster)
- **Issue Tracker**: [github.com/yourusername/coffee-brewmaster/issues](https://github.com/DUSHIMEDanPaul/coffee-brewmaster/issues)
- **Email**: danpauldushime03@gmail.com

---

<div align="center">

**Built with ☕ and 💙 by Me**

⭐ Star this repo if you found it helpful!

</div>
=======


This contains everything you need to run your app locally.
## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
>>>>>>> dee56c440c355dd11b1c056cd83eed9329e4a540

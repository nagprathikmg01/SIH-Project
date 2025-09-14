import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Cloud, 
  Sun, 
  Droplets, 
  Wind,
  Star,
  Calendar,
  MapPin,
  DollarSign,
  GripVertical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';

export function Dashboard() {
  const [isDragging, setIsDragging] = useState(false);

  const marketData = [
    { month: 'Jan', rice: 2400, wheat: 2100, maize: 1800 },
    { month: 'Feb', rice: 2300, wheat: 2200, maize: 1900 },
    { month: 'Mar', rice: 2500, wheat: 2300, maize: 2000 },
    { month: 'Apr', rice: 2700, wheat: 2400, maize: 2100 },
    { month: 'May', rice: 2600, wheat: 2500, maize: 2200 },
    { month: 'Jun', rice: 2800, wheat: 2600, maize: 2300 },
  ];

  const weatherData = [
    { day: 'Mon', temp: 28, humidity: 65 },
    { day: 'Tue', temp: 32, humidity: 70 },
    { day: 'Wed', temp: 30, humidity: 68 },
    { day: 'Thu', temp: 29, humidity: 72 },
    { day: 'Fri', temp: 31, humidity: 66 },
    { day: 'Sat', temp: 33, humidity: 64 },
    { day: 'Sun', temp: 35, humidity: 60 },
  ];

  const cropOfWeek = {
    name: "Basmati Rice",
    season: "Kharif",
    profitability: 85,
    demand: "High",
    image: "https://images.unsplash.com/photo-1655903724829-37b3cd3d4ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGFkZHklMjBmaWVsZHMlMjBncmVlbnxlbnwxfHx8fDE3NTc4NjcyNjd8MA&ixlib=rb-4.1.0&q=80&w=400"
  };

  const MarketWidget = () => (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-karnataka-green" />
          Market Prices
        </CardTitle>
        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Rice (per quintal)</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">₹2,800</span>
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5%
              </Badge>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Wheat (per quintal)</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">₹2,600</span>
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3%
              </Badge>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Maize (per quintal)</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">₹2,300</span>
              <Badge className="bg-red-100 text-red-800">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2%
              </Badge>
            </div>
          </div>
        </div>
        <div className="mt-4 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketData}>
              <Line 
                type="monotone" 
                dataKey="rice" 
                stroke="var(--karnataka-green)" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="wheat" 
                stroke="var(--karnataka-orange)" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  const WeatherWidget = () => (
    <Card className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Sun className="h-5 w-5" />
          Weather Update
        </CardTitle>
        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-3xl font-bold text-blue-800">32°C</p>
            <p className="text-blue-600">Partly Cloudy</p>
          </div>
          <Cloud className="h-12 w-12 text-blue-600" />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <Droplets className="h-4 w-4 mx-auto text-blue-600 mb-1" />
            <p className="text-sm text-blue-800">68%</p>
            <p className="text-xs text-blue-600">Humidity</p>
          </div>
          <div className="text-center">
            <Wind className="h-4 w-4 mx-auto text-blue-600 mb-1" />
            <p className="text-sm text-blue-800">12 km/h</p>
            <p className="text-xs text-blue-600">Wind</p>
          </div>
          <div className="text-center">
            <MapPin className="h-4 w-4 mx-auto text-blue-600 mb-1" />
            <p className="text-sm text-blue-800">Bangalore</p>
            <p className="text-xs text-blue-600">Location</p>
          </div>
        </div>

        <div className="h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weatherData}>
              <Area 
                type="monotone" 
                dataKey="temp" 
                stroke="#2563eb" 
                fill="#3b82f6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  const CropOfWeekWidget = () => (
    <Card className="bg-gradient-to-br from-karnataka-green/10 to-leaf-green/10 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-karnataka-green">
          <Star className="h-5 w-5" />
          Crop of the Week
        </CardTitle>
        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={cropOfWeek.image} 
            alt={cropOfWeek.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold text-karnataka-green">{cropOfWeek.name}</h3>
            <p className="text-sm text-muted-foreground">{cropOfWeek.season} Season</p>
            <Badge className="mt-1 bg-karnataka-orange/20 text-karnataka-orange">
              {cropOfWeek.demand} Demand
            </Badge>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Profitability</span>
            <span className="font-semibold text-karnataka-green">{cropOfWeek.profitability}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-karnataka-green to-leaf-green h-2 rounded-full transition-all duration-1000"
              style={{ width: `${cropOfWeek.profitability}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <div className="text-center">
              <Calendar className="h-4 w-4 mx-auto text-karnataka-green mb-1" />
              <p className="text-xs text-muted-foreground">90 days</p>
            </div>
            <div className="text-center">
              <DollarSign className="h-4 w-4 mx-auto text-karnataka-green mb-1" />
              <p className="text-xs text-muted-foreground">High ROI</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-white to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-karnataka-green/10 text-karnataka-green">
            Smart Dashboard
          </Badge>
          <h2 className="text-4xl text-karnataka-green mb-4">
            Your Farm at a Glance
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Customizable widgets providing real-time insights into market trends, 
            weather conditions, and crop recommendations tailored for Karnataka.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <MarketWidget />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <WeatherWidget />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <CropOfWeekWidget />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            💡 Drag widgets to customize your dashboard layout
          </p>
        </motion.div>
      </div>
    </section>
  );
}
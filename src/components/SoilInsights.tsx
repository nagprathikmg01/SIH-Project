import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Droplets, 
  Thermometer, 
  Calendar, 
  DollarSign,
  Info,
  Sliders,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function SoilInsights() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [soilType, setSoilType] = useState('red');
  const [rainfall, setRainfall] = useState([800]);
  const [season, setSeason] = useState('kharif');
  const [budget, setBudget] = useState([50000]);

  const districts = [
    {
      name: 'Bangalore Rural',
      coordinates: { x: 65, y: 45 },
      soilType: 'Red Laterite',
      rainfall: '850mm',
      temperature: '25-30°C',
      crops: ['Rice', 'Ragi', 'Sugarcane', 'Vegetables'],
      suitability: 95
    },
    {
      name: 'Mysore',
      coordinates: { x: 55, y: 65 },
      soilType: 'Red Loamy',
      rainfall: '750mm',
      temperature: '22-28°C',
      crops: ['Coffee', 'Cardamom', 'Rice', 'Maize'],
      suitability: 90
    },
    {
      name: 'Hassan',
      coordinates: { x: 50, y: 55 },
      soilType: 'Black Cotton',
      rainfall: '1200mm',
      temperature: '20-26°C',
      crops: ['Coffee', 'Areca Nut', 'Cardamom', 'Pepper'],
      suitability: 88
    },
    {
      name: 'Mandya',
      coordinates: { x: 60, y: 60 },
      soilType: 'Alluvial',
      rainfall: '650mm',
      temperature: '24-29°C',
      crops: ['Sugarcane', 'Rice', 'Ragi', 'Pulses'],
      suitability: 92
    },
    {
      name: 'Tumkur',
      coordinates: { x: 60, y: 50 },
      soilType: 'Red Sandy',
      rainfall: '600mm',
      temperature: '25-32°C',
      crops: ['Groundnut', 'Cotton', 'Maize', 'Millets'],
      suitability: 85
    },
    {
      name: 'Belgaum',
      coordinates: { x: 30, y: 35 },
      soilType: 'Black',
      rainfall: '550mm',
      temperature: '26-35°C',
      crops: ['Cotton', 'Sugarcane', 'Jowar', 'Maize'],
      suitability: 87
    }
  ];

  const simulationResults = [
    {
      crop: 'Sugarcane',
      suitability: 94,
      roi: '180%',
      duration: '12 months',
      risk: 'Low',
      revenue: '₹2,40,000',
      reasons: ['High water availability', 'Suitable soil pH', 'Good market demand']
    },
    {
      crop: 'Rice',
      suitability: 88,
      roi: '140%',
      duration: '4 months',
      risk: 'Medium',
      revenue: '₹1,20,000',
      reasons: ['Adequate rainfall', 'Traditional expertise', 'Government support']
    },
    {
      crop: 'Cotton',
      suitability: 75,
      roi: '120%',
      duration: '6 months',
      risk: 'High',
      revenue: '₹80,000',
      reasons: ['Market volatility', 'Pest management required', 'Good fiber quality']
    }
  ];

  const getSuitabilityColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="soil" className="py-20 bg-gradient-to-b from-secondary/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-earth-brown/10 text-earth-brown">
            Soil Intelligence
          </Badge>
          <h2 className="text-4xl text-karnataka-green mb-4">
            Soil-Crop Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive exploration of Karnataka's soil types and crop compatibility. 
            Simulate farming scenarios with real district data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-karnataka-green">
                  <MapPin className="h-5 w-5" />
                  Karnataka Districts
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Click on districts to explore soil characteristics and suitable crops
                </p>
              </CardHeader>
              <CardContent>
                {/* Simplified Karnataka Map */}
                <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 h-96 overflow-hidden">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                  >
                    {/* Karnataka outline (simplified) */}
                    <path
                      d="M20,30 L35,25 L45,20 L60,25 L75,30 L80,45 L75,60 L70,75 L60,80 L45,82 L30,80 L20,70 L15,55 L18,40 Z"
                      fill="rgba(34, 139, 34, 0.1)"
                      stroke="var(--karnataka-green)"
                      strokeWidth="0.5"
                    />
                    
                    {/* District markers */}
                    {districts.map((district, index) => (
                      <g key={index}>
                        <circle
                          cx={district.coordinates.x}
                          cy={district.coordinates.y}
                          r="3"
                          fill={selectedDistrict?.name === district.name ? 
                            "var(--karnataka-orange)" : "var(--karnataka-green)"}
                          className="cursor-pointer hover:r-4 transition-all duration-200"
                          onClick={() => setSelectedDistrict(district)}
                        />
                        <text
                          x={district.coordinates.x}
                          y={district.coordinates.y - 5}
                          textAnchor="middle"
                          className="text-xs fill-karnataka-green font-medium cursor-pointer"
                          onClick={() => setSelectedDistrict(district)}
                        >
                          {district.name.split(' ')[0]}
                        </text>
                      </g>
                    ))}
                  </svg>
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-karnataka-green"></div>
                      <span>Districts</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <div className="w-3 h-3 rounded-full bg-karnataka-orange"></div>
                      <span>Selected</span>
                    </div>
                  </div>
                </div>

                {/* District Info */}
                {selectedDistrict && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-gradient-to-r from-karnataka-green/5 to-leaf-green/5 rounded-lg border border-karnataka-green/20"
                  >
                    <h4 className="text-lg text-karnataka-green mb-3">{selectedDistrict.name}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Soil Type</p>
                        <p className="font-medium">{selectedDistrict.soilType}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rainfall</p>
                        <p className="font-medium">{selectedDistrict.rainfall}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Temperature</p>
                        <p className="font-medium">{selectedDistrict.temperature}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Suitability</p>
                        <Badge className={getSuitabilityColor(selectedDistrict.suitability)}>
                          {selectedDistrict.suitability}%
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-muted-foreground text-sm mb-2">Recommended Crops</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedDistrict.crops.map((crop, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Simulation Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Simulation Controls */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-karnataka-green">
                  <Sliders className="h-5 w-5" />
                  What Can I Grow Here?
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Adjust parameters to simulate different farming scenarios
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Soil Type</label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">Red Laterite</SelectItem>
                      <SelectItem value="black">Black Cotton</SelectItem>
                      <SelectItem value="alluvial">Alluvial</SelectItem>
                      <SelectItem value="sandy">Sandy Loam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Rainfall: {rainfall[0]}mm
                  </label>
                  <Slider
                    value={rainfall}
                    onValueChange={setRainfall}
                    max={1500}
                    min={300}
                    step={50}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Season</label>
                  <Select value={season} onValueChange={setSeason}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kharif">Kharif (June-Oct)</SelectItem>
                      <SelectItem value="rabi">Rabi (Nov-Apr)</SelectItem>
                      <SelectItem value="summer">Summer (Apr-Jun)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Budget: ₹{budget[0].toLocaleString()}
                  </label>
                  <Slider
                    value={budget}
                    onValueChange={setBudget}
                    max={200000}
                    min={10000}
                    step={5000}
                    className="w-full"
                  />
                </div>

                <Button className="w-full bg-karnataka-orange hover:bg-karnataka-orange/90">
                  <Zap className="h-4 w-4 mr-2" />
                  Simulate Crop Options
                </Button>
              </CardContent>
            </Card>

            {/* Simulation Results */}
            <Card className="p-6 bg-gradient-to-br from-karnataka-green/5 to-leaf-green/5 border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-karnataka-green">Recommended Crops</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Based on your simulation parameters
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {simulationResults.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white rounded-lg border border-karnataka-green/20"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg text-karnataka-green">{result.crop}</h4>
                          <Badge className={getSuitabilityColor(result.suitability)}>
                            {result.suitability}% Match
                          </Badge>
                        </div>
                        <Badge className={getRiskColor(result.risk)}>
                          {result.risk} Risk
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                        <div className="text-center">
                          <DollarSign className="h-4 w-4 mx-auto text-karnataka-green mb-1" />
                          <p className="font-medium">{result.roi}</p>
                          <p className="text-muted-foreground text-xs">ROI</p>
                        </div>
                        <div className="text-center">
                          <Calendar className="h-4 w-4 mx-auto text-karnataka-green mb-1" />
                          <p className="font-medium">{result.duration}</p>
                          <p className="text-muted-foreground text-xs">Duration</p>
                        </div>
                        <div className="text-center">
                          <span className="text-lg">💰</span>
                          <p className="font-medium">{result.revenue}</p>
                          <p className="text-muted-foreground text-xs">Revenue</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2 flex items-center gap-1">
                          <Info className="h-3 w-3" />
                          Why this crop?
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {result.reasons.map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-karnataka-green">•</span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
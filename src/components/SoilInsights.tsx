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
import { KarnatakaMap } from './KarnatakaMap';
import { useAuth } from '../contexts/AuthContext';

export function SoilInsights() {
  const { user } = useAuth();
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [soilType, setSoilType] = useState('red');
  const [rainfall, setRainfall] = useState([800]);
  const [season, setSeason] = useState('kharif');
  const [budget, setBudget] = useState([50000]);


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
            <KarnatakaMap 
              selectedDistrict={selectedDistrict}
              onDistrictSelect={setSelectedDistrict}
              userDistrict={user?.district}
            />
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
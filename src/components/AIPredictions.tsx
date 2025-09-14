import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  MapPin, 
  Droplets, 
  Calendar, 
  DollarSign,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Star,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';

export function AIPredictions() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    location: '',
    soilType: '',
    season: '',
    budget: [50000],
    experience: '',
    landSize: [5]
  });
  const [showResults, setShowResults] = useState(false);

  const steps = [
    { title: 'Location', icon: MapPin, description: 'Where is your farm located?' },
    { title: 'Soil Type', icon: Droplets, description: 'What type of soil do you have?' },
    { title: 'Season', icon: Calendar, description: 'When do you plan to cultivate?' },
    { title: 'Budget', icon: DollarSign, description: 'What is your investment budget?' },
    { title: 'Experience', icon: Brain, description: 'What is your farming experience?' }
  ];

  const predictions = [
    {
      crop: 'Basmati Rice',
      confidence: 96,
      roi: '185%',
      revenue: '₹2,45,000',
      duration: '4 months',
      risk: 'Low',
      priceProjection: [
        { month: 'Month 1', price: 2400 },
        { month: 'Month 2', price: 2500 },
        { month: 'Month 3', price: 2650 },
        { month: 'Month 4', price: 2800 },
        { month: 'Month 5', price: 2900 },
        { month: 'Month 6', price: 3100 }
      ],
      whyRecommended: [
        'Perfect soil pH match (6.5-7.0)',
        'Optimal rainfall predicted (800-1000mm)',
        'High market demand in upcoming season',
        'Government MSP support available'
      ],
      regionalTips: [
        'Use SRI method for 30% higher yield',
        'Plant during first week of June',
        'Apply organic manure 2 weeks before sowing'
      ],
      riskFactors: [
        'Monitor for blast disease',
        'Ensure proper drainage',
        'Weather dependency during flowering'
      ]
    },
    {
      crop: 'Sugarcane',
      confidence: 89,
      roi: '165%',
      revenue: '₹2,15,000',
      duration: '12 months',
      risk: 'Medium',
      priceProjection: [
        { month: 'Month 1', price: 3200 },
        { month: 'Month 2', price: 3300 },
        { month: 'Month 3', price: 3400 },
        { month: 'Month 4', price: 3600 },
        { month: 'Month 5', price: 3700 },
        { month: 'Month 6', price: 3900 }
      ],
      whyRecommended: [
        'Excellent water availability',
        'Suitable temperature range',
        'Strong sugar mill network',
        'Consistent market demand'
      ],
      regionalTips: [
        'Plant during monsoon season',
        'Use drip irrigation for efficiency',
        'Intercrop with legumes'
      ],
      riskFactors: [
        'Long gestation period',
        'Market price volatility',
        'Pest management required'
      ]
    },
    {
      crop: 'Cotton (Bt Variety)',
      confidence: 82,
      roi: '145%',
      revenue: '₹1,85,000',
      duration: '6 months',
      risk: 'High',
      priceProjection: [
        { month: 'Month 1', price: 5800 },
        { month: 'Month 2', price: 6000 },
        { month: 'Month 3', price: 6200 },
        { month: 'Month 4', price: 6500 },
        { month: 'Month 5', price: 6700 },
        { month: 'Month 6', price: 7000 }
      ],
      whyRecommended: [
        'Good soil drainage',
        'Suitable climate conditions',
        'Export market potential',
        'Technology adoption support'
      ],
      regionalTips: [
        'Use certified Bt seeds',
        'Implement IPM practices',
        'Monitor bollworm activity'
      ],
      riskFactors: [
        'Market price fluctuations',
        'Pest resistance issues',
        'Weather dependency'
      ]
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 80) return 'text-yellow-600 bg-yellow-100';
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

  if (showResults) {
    return (
      <section id="predictions" className="py-20 bg-gradient-to-br from-karnataka-green/5 to-leaf-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-karnataka-green/10 text-karnataka-green">
              <Zap className="h-4 w-4 mr-2" />
              AI Recommendations Ready
            </Badge>
            <h2 className="text-4xl text-karnataka-green mb-4">
              Your Personalized Crop Predictions
            </h2>
            <p className="text-xl text-muted-foreground">
              Based on your inputs, here are the top 3 crops with highest success probability
            </p>
          </motion.div>

          <div className="space-y-8">
            {predictions.map((prediction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-karnataka-green/10 to-leaf-green/10 pb-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-karnataka-green to-leaf-green rounded-full flex items-center justify-center text-white text-xl">
                          #{index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-karnataka-green mb-2">
                            {prediction.crop}
                          </CardTitle>
                          <div className="flex items-center gap-4">
                            <Badge className={getConfidenceColor(prediction.confidence)}>
                              <Brain className="h-3 w-3 mr-1" />
                              {prediction.confidence}% Confidence
                            </Badge>
                            <Badge className={getRiskColor(prediction.risk)}>
                              {prediction.risk} Risk
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(prediction.confidence / 20)
                                  ? 'text-karnataka-orange fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">AI Rating</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Key Metrics */}
                      <div>
                        <h4 className="text-lg text-karnataka-green mb-4">Key Metrics</h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                            <span className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-karnataka-green" />
                              ROI
                            </span>
                            <span className="font-semibold text-karnataka-green">{prediction.roi}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                            <span className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-karnataka-green" />
                              Revenue
                            </span>
                            <span className="font-semibold">{prediction.revenue}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                            <span className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-karnataka-green" />
                              Duration
                            </span>
                            <span className="font-semibold">{prediction.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price Projection Chart */}
                      <div>
                        <h4 className="text-lg text-karnataka-green mb-4">Price Projection</h4>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={prediction.priceProjection}>
                              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                              <YAxis tick={{ fontSize: 12 }} />
                              <Area
                                type="monotone"
                                dataKey="price"
                                stroke="var(--karnataka-green)"
                                fill="var(--karnataka-green)"
                                fillOpacity={0.2}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Projected price per quintal over 6 months
                        </p>
                      </div>

                      {/* Why Recommended */}
                      <div>
                        <h4 className="text-lg text-karnataka-green mb-4">Why This Crop?</h4>
                        <div className="space-y-3">
                          {prediction.whyRecommended.map((reason, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <div className="mt-8 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-karnataka-green mb-3">Regional Tips</h5>
                        <ul className="space-y-2">
                          {prediction.regionalTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-karnataka-orange">💡</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-600 mb-3">Risk Assessment</h5>
                        <ul className="space-y-2">
                          {prediction.riskFactors.map((risk, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => setShowResults(false)}
              variant="outline"
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Wizard
            </Button>
            <Button className="bg-karnataka-green hover:bg-karnataka-green/90">
              Save Predictions
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="predictions" className="py-20 bg-gradient-to-br from-karnataka-green/5 to-leaf-green/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-karnataka-green/10 text-karnataka-green">
            <Brain className="h-4 w-4 mr-2" />
            AI Crop Prediction
          </Badge>
          <h2 className="text-4xl text-karnataka-green mb-4">
            Intelligent Crop Recommendations
          </h2>
          <p className="text-xl text-muted-foreground">
            Answer a few questions to get personalized crop predictions powered by AI
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index <= currentStep
                      ? 'bg-karnataka-green text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <p className="text-sm mt-2 text-center max-w-20">{step.title}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-karnataka-green to-leaf-green h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl text-karnataka-green mb-2">
                  {steps[currentStep].title}
                </h3>
                <p className="text-muted-foreground">
                  {steps[currentStep].description}
                </p>
              </div>

              <div className="max-w-md mx-auto">
                {/* Step 0: Location */}
                {currentStep === 0 && (
                  <Select
                    value={formData.location}
                    onValueChange={(value) => updateFormData('location', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bangalore">Bangalore Rural</SelectItem>
                      <SelectItem value="mysore">Mysore</SelectItem>
                      <SelectItem value="hassan">Hassan</SelectItem>
                      <SelectItem value="mandya">Mandya</SelectItem>
                      <SelectItem value="tumkur">Tumkur</SelectItem>
                      <SelectItem value="belgaum">Belgaum</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {/* Step 1: Soil Type */}
                {currentStep === 1 && (
                  <RadioGroup
                    value={formData.soilType}
                    onValueChange={(value) => updateFormData('soilType', value)}
                    className="space-y-4"
                  >
                    {['Red Laterite', 'Black Cotton', 'Alluvial', 'Sandy Loam'].map((soil) => (
                      <div key={soil} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/30">
                        <RadioGroupItem value={soil.toLowerCase().replace(' ', '-')} id={soil} />
                        <Label htmlFor={soil} className="flex-1 cursor-pointer">{soil}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {/* Step 2: Season */}
                {currentStep === 2 && (
                  <RadioGroup
                    value={formData.season}
                    onValueChange={(value) => updateFormData('season', value)}
                    className="space-y-4"
                  >
                    {[
                      { value: 'kharif', label: 'Kharif (June - October)', desc: 'Monsoon season crops' },
                      { value: 'rabi', label: 'Rabi (November - April)', desc: 'Winter season crops' },
                      { value: 'summer', label: 'Summer (April - June)', desc: 'Summer season crops' }
                    ].map((season) => (
                      <div key={season.value} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/30">
                        <RadioGroupItem value={season.value} id={season.value} />
                        <Label htmlFor={season.value} className="flex-1 cursor-pointer">
                          <div>
                            <p>{season.label}</p>
                            <p className="text-sm text-muted-foreground">{season.desc}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {/* Step 3: Budget */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-3xl text-karnataka-green mb-2">
                        ₹{formData.budget[0].toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Investment Budget</p>
                    </div>
                    <Slider
                      value={formData.budget}
                      onValueChange={(value) => updateFormData('budget', value)}
                      max={500000}
                      min={10000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹10K</span>
                      <span>₹5L</span>
                    </div>
                  </div>
                )}

                {/* Step 4: Experience */}
                {currentStep === 4 && (
                  <RadioGroup
                    value={formData.experience}
                    onValueChange={(value) => updateFormData('experience', value)}
                    className="space-y-4"
                  >
                    {[
                      { value: 'beginner', label: 'Beginner', desc: 'New to farming' },
                      { value: 'intermediate', label: 'Intermediate', desc: '2-5 years experience' },
                      { value: 'experienced', label: 'Experienced', desc: '5+ years experience' }
                    ].map((exp) => (
                      <div key={exp.value} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/30">
                        <RadioGroupItem value={exp.value} id={exp.value} />
                        <Label htmlFor={exp.value} className="flex-1 cursor-pointer">
                          <div>
                            <p>{exp.label}</p>
                            <p className="text-sm text-muted-foreground">{exp.desc}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              className="bg-karnataka-green hover:bg-karnataka-green/90"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Get Predictions
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
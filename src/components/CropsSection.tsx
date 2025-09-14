import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  Shield, 
  Calendar, 
  BookOpen,
  X,
  Star,
  TrendingUp,
  Droplets,
  Sun
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export function CropsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Cereals', 'Pulses', 'Cash Crops', 'Vegetables', 'Fruits'];

  const crops = [
    {
      id: 1,
      name: 'Rice',
      category: 'Cereals',
      season: 'Kharif',
      image: 'https://images.unsplash.com/photo-1655903724829-37b3cd3d4ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGFkZHklMjBmaWVsZHMlMjBncmVlbnxlbnwxfHx8fDE3NTc4NjcyNjd8MA&ixlib=rb-4.1.0&q=80&w=400',
      profitability: 85,
      diseases: [
        { name: 'Blast', severity: 'High', treatment: 'Fungicide spray', prevention: 'Resistant varieties' },
        { name: 'Bacterial Blight', severity: 'Medium', treatment: 'Copper compounds', prevention: 'Seed treatment' },
        { name: 'Brown Spot', severity: 'Low', treatment: 'Foliar spray', prevention: 'Balanced nutrition' }
      ],
      overview: 'Rice is the staple food crop of Karnataka, grown primarily during Kharif season.',
      bestPractices: [
        'Transplant 20-25 day old seedlings',
        'Maintain 2-3 cm water level',
        'Apply balanced fertilizers',
        'Monitor for pest attacks'
      ]
    },
    {
      id: 2,
      name: 'Sugarcane',
      category: 'Cash Crops',
      season: 'Year-round',
      image: 'https://images.unsplash.com/photo-1707721690544-781fe6ede937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBmYXJtZXIlMjBhZ3JpY3VsdHVyZSUyMGNyb3BzfGVufDF8fHx8MTc1Nzg2NzI2Nnww&ixlib=rb-4.1.0&q=80&w=400',
      profitability: 92,
      diseases: [
        { name: 'Red Rot', severity: 'High', treatment: 'Resistant varieties', prevention: 'Crop rotation' },
        { name: 'Smut', severity: 'Medium', treatment: 'Fungicide treatment', prevention: 'Hot water treatment' },
        { name: 'Whip Smut', severity: 'Medium', treatment: 'Remove infected plants', prevention: 'Disease-free setts' }
      ],
      overview: 'Sugarcane is a major cash crop in Karnataka, contributing significantly to farmers income.',
      bestPractices: [
        'Plant disease-free setts',
        'Maintain proper spacing',
        'Regular irrigation',
        'Timely harvesting'
      ]
    },
    {
      id: 3,
      name: 'Cotton',
      category: 'Cash Crops',
      season: 'Kharif',
      image: 'https://images.unsplash.com/photo-1620684565173-cc2e881557dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2lsJTIwZmFybWluZyUyMGhhbmRzfGVufDF8fHx8MTc1Nzc0OTAwMXww&ixlib=rb-4.1.0&q=80&w=400',
      profitability: 78,
      diseases: [
        { name: 'Bollworm', severity: 'High', treatment: 'Bt cotton varieties', prevention: 'Pheromone traps' },
        { name: 'Aphids', severity: 'Medium', treatment: 'Insecticide spray', prevention: 'Natural predators' },
        { name: 'Jassids', severity: 'Low', treatment: 'Neem-based sprays', prevention: 'Regular monitoring' }
      ],
      overview: 'Cotton is an important cash crop grown in northern districts of Karnataka.',
      bestPractices: [
        'Use certified seeds',
        'Follow integrated pest management',
        'Proper soil preparation',
        'Timely sowing'
      ]
    }
  ];

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openCropModal = (crop) => {
    setSelectedCrop(crop);
    setIsModalOpen(true);
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="crops" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-leaf-green/10 text-leaf-green">
            Crop Intelligence
          </Badge>
          <h2 className="text-4xl text-karnataka-green mb-4">
            Crops & Disease Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive crop database with disease identification, treatment options, 
            and best practices for Karnataka's agricultural conditions.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 
                    "bg-karnataka-green hover:bg-karnataka-green/90" : 
                    "border-karnataka-green text-karnataka-green hover:bg-karnataka-green hover:text-white"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCrops.map((crop, index) => (
              <motion.div
                key={crop.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card 
                  className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 bg-white border-0 shadow-lg"
                  onClick={() => openCropModal(crop)}
                >
                  <div className="relative">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-karnataka-green">
                        {crop.season}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 rounded-full p-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-karnataka-orange fill-current" />
                          <span className="text-sm font-medium">{crop.profitability}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl text-karnataka-green mb-1">{crop.name}</h3>
                        <p className="text-sm text-muted-foreground">{crop.category}</p>
                      </div>
                      <TrendingUp className="h-5 w-5 text-karnataka-green" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Profitability</span>
                        <span className="font-medium text-karnataka-green">{crop.profitability}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-karnataka-green to-leaf-green h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${crop.profitability}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <Badge variant="outline" className="text-xs">
                          {crop.diseases.length} Common Diseases
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-karnataka-green">
                          Learn More →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Crop Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedCrop && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={selectedCrop.image}
                      alt={selectedCrop.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <DialogTitle className="text-2xl text-karnataka-green">
                        {selectedCrop.name}
                      </DialogTitle>
                      <p className="text-muted-foreground">{selectedCrop.category} • {selectedCrop.season}</p>
                    </div>
                  </div>
                </DialogHeader>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="diseases">Diseases</TabsTrigger>
                    <TabsTrigger value="treatments">Treatments</TabsTrigger>
                    <TabsTrigger value="practices">Best Practices</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card className="p-4 text-center">
                        <TrendingUp className="h-8 w-8 mx-auto text-karnataka-green mb-2" />
                        <h4>Profitability</h4>
                        <p className="text-2xl text-karnataka-green">{selectedCrop.profitability}%</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <Calendar className="h-8 w-8 mx-auto text-karnataka-orange mb-2" />
                        <h4>Season</h4>
                        <p className="text-lg">{selectedCrop.season}</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <AlertTriangle className="h-8 w-8 mx-auto text-red-500 mb-2" />
                        <h4>Disease Risk</h4>
                        <p className="text-lg">{selectedCrop.diseases.length} Known</p>
                      </Card>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{selectedCrop.overview}</p>
                  </TabsContent>
                  
                  <TabsContent value="diseases" className="space-y-4">
                    <div className="space-y-4">
                      {selectedCrop.diseases.map((disease, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg text-karnataka-green">{disease.name}</h4>
                            <Badge className={getSeverityColor(disease.severity)}>
                              {disease.severity} Risk
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Treatment:</strong> {disease.treatment}
                            </div>
                            <div>
                              <strong>Prevention:</strong> {disease.prevention}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="treatments" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-6">
                        <Shield className="h-8 w-8 text-karnataka-green mb-4" />
                        <h4 className="text-lg mb-3">Preventive Measures</h4>
                        <ul className="space-y-2 text-sm">
                          {selectedCrop.diseases.map((disease, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-karnataka-green">•</span>
                              {disease.prevention}
                            </li>
                          ))}
                        </ul>
                      </Card>
                      
                      <Card className="p-6">
                        <AlertTriangle className="h-8 w-8 text-karnataka-orange mb-4" />
                        <h4 className="text-lg mb-3">Treatment Options</h4>
                        <ul className="space-y-2 text-sm">
                          {selectedCrop.diseases.map((disease, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-karnataka-orange">•</span>
                              <strong>{disease.name}:</strong> {disease.treatment}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="practices" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg text-karnataka-green mb-4 flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          Best Practices Timeline
                        </h4>
                        <div className="space-y-4">
                          {selectedCrop.bestPractices.map((practice, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-karnataka-green text-white text-xs flex items-center justify-center">
                                {index + 1}
                              </div>
                              <p className="text-sm">{practice}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg text-karnataka-green mb-4">Growing Conditions</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                            <Sun className="h-5 w-5 text-karnataka-orange" />
                            <div>
                              <p className="font-medium">Temperature</p>
                              <p className="text-sm text-muted-foreground">25-35°C optimal</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                            <Droplets className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium">Rainfall</p>
                              <p className="text-sm text-muted-foreground">600-1200mm annually</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
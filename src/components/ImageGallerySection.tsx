import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Camera,
  MapPin,
  Calendar,
  Users,
  Award,
  Wheat
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function ImageGallerySection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const galleryImages = [
    {
      id: 1,
      title: "Karnataka Rice Fields",
      location: "Mandya District",
      description: "Traditional paddy cultivation thriving in the rich alluvial soil of Mandya",
      category: "Rice Farming",
      stats: { farmers: "15,000+", yield: "4.2 tons/hectare", season: "Kharif 2024" },
      badge: "Top Yielding",
      color: "from-green-600 to-emerald-700"
    },
    {
      id: 2,
      title: "Sugarcane Plantations",
      location: "Hassan District", 
      description: "Modern sugarcane farming with advanced irrigation techniques",
      category: "Cash Crops",
      stats: { farmers: "8,500+", yield: "95 tons/hectare", season: "Annual" },
      badge: "Premium Quality",
      color: "from-yellow-600 to-amber-700"
    },
    {
      id: 3,
      title: "Coffee Estates",
      location: "Coorg (Kodagu)",
      description: "Aromatic coffee beans grown in the misty hills of Karnataka",
      category: "Plantation",
      stats: { farmers: "12,000+", yield: "850 kg/hectare", season: "Monsoon" },
      badge: "Export Grade",
      color: "from-brown-600 to-amber-800"
    },
    {
      id: 4,
      title: "Cotton Fields",
      location: "Belgaum District",
      description: "High-quality cotton cultivation using sustainable farming practices",
      category: "Fiber Crops",
      stats: { farmers: "20,000+", yield: "18 quintals/hectare", season: "Kharif" },
      badge: "Organic Certified",
      color: "from-blue-600 to-indigo-700"
    },
    {
      id: 5,
      title: "Spice Gardens",
      location: "Shimoga District",
      description: "Traditional spice cultivation - cardamom, pepper, and turmeric",
      category: "Spices",
      stats: { farmers: "5,500+", yield: "2.5 tons/hectare", season: "Monsoon" },
      badge: "Heritage Variety",
      color: "from-red-600 to-rose-700"
    },
    {
      id: 6,
      title: "Millet Farms",
      location: "Tumkur District",
      description: "Climate-resilient millet farming for sustainable agriculture",
      category: "Millets",
      stats: { farmers: "18,000+", yield: "2.8 tons/hectare", season: "Kharif & Rabi" },
      badge: "Climate Smart",
      color: "from-orange-600 to-red-700"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying, galleryImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentImage = galleryImages[currentSlide];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-secondary/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-karnataka-orange/10 text-karnataka-orange">
            <Camera className="h-4 w-4 mr-2" />
            Visual Journey
          </Badge>
          <h2 className="text-4xl text-karnataka-green mb-4">
            Karnataka Agriculture Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the diverse agricultural landscape of Karnataka through stunning visuals and success stories
          </p>
        </motion.div>

        {/* Main Slideshow */}
        <div className="relative">
          <Card className="overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <div className="relative h-[500px] lg:h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 bg-gradient-to-br ${currentImage.color}`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(255,255,255,0.3) 2px, transparent 2px)',
                        backgroundSize: '40px 40px'
                      }}></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="text-white space-y-6"
                        >
                          <div>
                            <Badge className="mb-4 bg-white/20 text-white border-white/30">
                              {currentImage.badge}
                            </Badge>
                            <h3 className="text-4xl lg:text-5xl mb-4 leading-tight">
                              {currentImage.title}
                            </h3>
                            <div className="flex items-center gap-2 mb-4">
                              <MapPin className="h-5 w-5" />
                              <span className="text-lg">{currentImage.location}</span>
                            </div>
                            <p className="text-xl opacity-90 leading-relaxed">
                              {currentImage.description}
                            </p>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20">
                            <div className="text-center">
                              <Users className="h-6 w-6 mx-auto mb-2" />
                              <p className="text-2xl mb-1">{currentImage.stats.farmers}</p>
                              <p className="text-sm opacity-80">Farmers</p>
                            </div>
                            <div className="text-center">
                              <Award className="h-6 w-6 mx-auto mb-2" />
                              <p className="text-2xl mb-1">{currentImage.stats.yield}</p>
                              <p className="text-sm opacity-80">Avg Yield</p>
                            </div>
                            <div className="text-center">
                              <Calendar className="h-6 w-6 mx-auto mb-2" />
                              <p className="text-lg mb-1">{currentImage.stats.season}</p>
                              <p className="text-sm opacity-80">Season</p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Right Visual */}
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          className="relative"
                        >
                          <div className="relative">
                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                            
                            {/* Main Visual Card */}
                            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                              <div className="flex items-center justify-center h-64 bg-white/10 rounded-xl">
                                <Wheat className="h-32 w-32 text-white/80" />
                              </div>
                              <div className="mt-6 text-center">
                                <Badge className="bg-white/20 text-white">
                                  {currentImage.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute inset-y-0 left-4 flex items-center">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={prevSlide}
                  className="text-white hover:bg-white/20 rounded-full w-12 h-12 p-0"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="absolute inset-y-0 right-4 flex items-center">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={nextSlide}
                  className="text-white hover:bg-white/20 rounded-full w-12 h-12 p-0"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Play/Pause Control */}
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:bg-white/20 rounded-full"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </Card>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-karnataka-orange scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 max-w-md mx-auto">
            <div className="bg-gray-200 rounded-full h-1">
              <motion.div
                className="bg-karnataka-orange h-1 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSlide + 1) / galleryImages.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-2xl text-karnataka-green mb-8 text-center">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentSlide 
                    ? 'ring-2 ring-karnataka-orange shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => goToSlide(index)}
              >
                <div className={`aspect-video bg-gradient-to-br ${image.color} p-4 flex items-center justify-center`}>
                  <Wheat className="h-8 w-8 text-white" />
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm text-center px-2">{image.title}</p>
                </div>
                {index === currentSlide && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-karnataka-orange rounded-full animate-pulse"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
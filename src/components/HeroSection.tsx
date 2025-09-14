import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function HeroSection() {
  const [currentBg, setCurrentBg] = useState(0);
  
  const backgroundImages = [
    {
      url: "https://images.unsplash.com/photo-1661153106674-8b377f435a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
      title: "Karnataka Rice Fields",
      subtitle: "Golden harvest season"
    },
    {
      url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
      title: "Sugarcane Plantations",
      subtitle: "Sweet success stories"
    },
    {
      url: "https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
      title: "Coffee Estates",
      subtitle: "Aromatic hills of Coorg"
    },
    {
      url: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
      title: "Spice Gardens",
      subtitle: "Traditional cultivation"
    }
  ];

  const floatingIcons = [
    { icon: "🌾", delay: 0, x: 100, y: 50 },
    { icon: "🚜", delay: 0.5, x: -80, y: 100 },
    { icon: "🌱", delay: 1, x: 150, y: -50 },
    { icon: "🍃", delay: 1.5, x: -120, y: -80 },
    { icon: "🌽", delay: 2, x: 200, y: 80 },
  ];

  // Auto-change background every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={backgroundImages[currentBg].url}
              alt={backgroundImages[currentBg].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-karnataka-green/70 via-transparent to-karnataka-green/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        {/* Background Info */}
        <motion.div 
          key={`info-${currentBg}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-8 left-8 text-white z-10"
        >
          <p className="text-sm opacity-80">{backgroundImages[currentBg].subtitle}</p>
          <p className="text-lg">{backgroundImages[currentBg].title}</p>
        </motion.div>

        {/* Background Indicators */}
        <div className="absolute bottom-8 right-8 flex space-x-2 z-10">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBg(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentBg ? 'bg-karnataka-orange scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0, 1.2, 1, 0],
            x: [0, item.x],
            y: [0, item.y]
          }}
          transition={{
            duration: 4,
            delay: item.delay,
            repeat: Infinity,
            repeatDelay: 3
          }}
          style={{ 
            left: '50%', 
            top: '50%',
            transform: 'translate(-50%, -50%)' 
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Agriculture
          </Badge>
          
          <motion.h1 
            className="text-5xl md:text-7xl text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Cultivate
            <span className="block text-karnataka-orange">Karnataka's Future</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Empowering farmers with AI-driven crop insights, soil analysis, and precision agriculture 
            solutions tailored for Karnataka's diverse landscape.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" className="bg-karnataka-orange hover:bg-karnataka-orange/90 text-white px-8 py-4 text-lg">
              Start Farming Smart
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-karnataka-green px-8 py-4 text-lg">
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-karnataka-orange" />
              </div>
              <h3 className="text-2xl text-white mb-2">25,000+</h3>
              <p className="text-white/80">Farmers Empowered</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-karnataka-orange" />
              </div>
              <h3 className="text-2xl text-white mb-2">30+</h3>
              <p className="text-white/80">Karnataka Districts</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-karnataka-orange" />
              </div>
              <h3 className="text-2xl text-white mb-2">95%</h3>
              <p className="text-white/80">Accuracy Rate</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}
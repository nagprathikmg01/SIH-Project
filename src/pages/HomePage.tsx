import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Wheat, 
  MapPin, 
  Brain, 
  User, 
  Search,
  Menu,
  X,
  Globe,
  LogIn,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { HeroSection } from '../components/HeroSection';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: Wheat, label: 'Features', href: '#features' },
    { icon: Brain, label: 'AI Predictions', href: '#ai' },
    { icon: Users, label: 'Testimonials', href: '#testimonials' },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Get personalized crop recommendations based on your soil, weather, and market conditions.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MapPin,
      title: 'District-Specific Insights',
      description: 'Access localized farming data and recommendations for all 31 districts of Karnataka.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Market Intelligence',
      description: 'Real-time crop prices, market trends, and profit optimization strategies.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Shield,
      title: 'Disease Detection',
      description: 'Early detection of crop diseases and pests with AI-powered image recognition.',
      color: 'from-red-500 to-red-600'
    }
  ];

  const languages = ['EN', 'KN', 'HI'];

  return (
    <div className="min-h-screen bg-background">
      {/* Main Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-karnataka-green to-leaf-green rounded-lg flex items-center justify-center">
                <Wheat className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-karnataka-green font-bold">KarnatakaKrishi</h1>
                <p className="text-xs text-muted-foreground">Smart Farming</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-2 text-karnataka-green hover:text-karnataka-orange transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Search, Language & Auth */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const nextLang = languages[(languages.indexOf(currentLang) + 1) % languages.length];
                    setCurrentLang(nextLang);
                  }}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {currentLang}
                </Button>
              </div>

              <Button 
                size="sm" 
                className="bg-karnataka-green hover:bg-karnataka-green/90"
                onClick={() => navigate('/signin')}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMenuOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-16 right-0 w-72 h-[calc(100vh-4rem)] bg-white/95 backdrop-blur-lg border-l border-white/20 shadow-2xl z-40 md:hidden"
      >
        <div className="p-6">
          <div className="space-y-4">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 text-karnataka-green" />
                <span>{item.label}</span>
              </motion.a>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t space-y-3">
            <Button className="w-full" variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => {
                const nextLang = languages[(languages.indexOf(currentLang) + 1) % languages.length];
                setCurrentLang(nextLang);
              }}
            >
              <Globe className="h-4 w-4 mr-2" />
              Language: {currentLang}
            </Button>
            <Button 
              className="w-full bg-karnataka-green hover:bg-karnataka-green/90"
              onClick={() => {
                navigate('/signin');
                setIsMenuOpen(false);
              }}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      </motion.div>

      <main>
        <HeroSection />
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-b from-white to-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl text-karnataka-green mb-4">
                Why Choose KarnatakaKrishi?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Empowering Karnataka farmers with cutting-edge technology and localized insights
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl text-karnataka-green mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-karnataka-green/10 to-leaf-green/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-4xl font-bold text-karnataka-green mb-2">25,000+</div>
                <div className="text-muted-foreground">Active Farmers</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="text-4xl font-bold text-karnataka-green mb-2">31</div>
                <div className="text-muted-foreground">Districts Covered</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-4xl font-bold text-karnataka-green mb-2">95%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-4xl font-bold text-karnataka-green mb-2">₹2.5Cr+</div>
                <div className="text-muted-foreground">Revenue Generated</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-karnataka-green to-leaf-green">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl text-white mb-6">
                Ready to Transform Your Farming?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of Karnataka farmers who are already using AI to maximize their yields and profits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-karnataka-green hover:bg-white/90"
                  onClick={() => navigate('/signin')}
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                >
                  <Star className="h-5 w-5 mr-2" />
                  View Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Testimonials />
        <Footer />
      </main>
    </div>
  );
}

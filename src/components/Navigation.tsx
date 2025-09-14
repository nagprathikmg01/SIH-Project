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
  LogIn
} from 'lucide-react';
import { Button } from './ui/button';
import { AuthModal } from './AuthModal';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: Wheat, label: 'Crops', href: '#crops' },
    { icon: MapPin, label: 'Soil', href: '#soil' },
    { icon: Brain, label: 'Predictions', href: '#predictions' },
    { icon: User, label: 'Profile', href: '#profile' },
  ];

  const languages = ['EN', 'KN', 'HI'];

  return (
    <>
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
                <h1 className="text-karnataka-green">KarnatakaKrishi</h1>
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

              {!isLoggedIn ? (
                <Button 
                  size="sm" 
                  className="bg-karnataka-green hover:bg-karnataka-green/90"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              ) : (
                <Button variant="ghost" size="sm" asChild>
                  <a href="#profile" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-karnataka-green rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span>Profile</span>
                  </a>
                </Button>
              )}
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
            
            {!isLoggedIn ? (
              <Button 
                className="w-full bg-karnataka-green hover:bg-karnataka-green/90"
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            ) : (
              <Button className="w-full" variant="outline" asChild>
                <a href="#profile" onClick={() => setIsMenuOpen(false)}>
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </a>
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Floating Action Button for Mobile */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-40 md:hidden"
      >
        <Button
          size="lg"
          className="w-16 h-16 rounded-full bg-gradient-to-r from-karnataka-green to-leaf-green shadow-2xl"
          asChild
        >
          <a href="#predictions">
            <Brain className="h-6 w-6" />
          </a>
        </Button>
      </motion.div>

      {/* Language Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed top-20 right-6 z-40"
      >
        <Button
          size="sm"
          variant="secondary"
          className="rounded-full bg-white/90 backdrop-blur-sm shadow-lg"
          onClick={() => {
            const nextLang = languages[(languages.indexOf(currentLang) + 1) % languages.length];
            setCurrentLang(nextLang);
          }}
        >
          <Globe className="h-4 w-4 mr-1" />
          {currentLang}
        </Button>
      </motion.div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsLoggedIn(true)}
      />
    </>
  );
}
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
  LogOut,
  Settings,
  Bell,
  ChevronDown
} from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export function DashboardLayout({ children, currentSection, onSectionChange }: DashboardLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', id: 'home', href: '#home' },
    { icon: Wheat, label: 'Crops', id: 'crops', href: '#crops' },
    { icon: MapPin, label: 'Soil & Diseases', id: 'soil', href: '#soil' },
    { icon: Brain, label: 'AI Predictions', id: 'predictions', href: '#predictions' },
    { icon: User, label: 'Profile', id: 'profile', href: '#profile' },
  ];

  const languages = ['EN', 'KN', 'HI'];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMenuOpen(false);
  };

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
                <h1 className="text-karnataka-green font-bold">KarnatakaKrishi</h1>
                <p className="text-xs text-muted-foreground">Smart Farming</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleSectionClick(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    currentSection === item.id
                      ? 'bg-karnataka-green text-white'
                      : 'text-karnataka-green hover:text-karnataka-orange hover:bg-karnataka-green/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* User Menu & Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBmYXJtZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE2OTI5MDgwNjN8MA&ixlib=rb-4.1.0&q=80&w=150" />
                      <AvatarFallback className="text-sm bg-karnataka-green text-white">
                        {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:block">{user?.name?.split(' ')[0] || 'User'}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {user?.district}
                    </Badge>
                  </div>
                  <DropdownMenuItem onClick={() => handleSectionClick('profile')}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
          {/* User Info */}
          <div className="flex items-center gap-3 mb-6 p-3 bg-karnataka-green/10 rounded-lg">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBmYXJtZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE2OTI5MDgwNjN8MA&ixlib=rb-4.1.0&q=80&w=150" />
              <AvatarFallback className="bg-karnataka-green text-white">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-karnataka-green">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.district}</p>
            </div>
          </div>

          <div className="space-y-4">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => handleSectionClick(item.id)}
                className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left transition-colors ${
                  currentSection === item.id
                    ? 'bg-karnataka-green text-white'
                    : 'hover:bg-secondary'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </motion.button>
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
              className="w-full" 
              variant="outline"
              onClick={() => handleSectionClick('profile')}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>
    </>
  );
}

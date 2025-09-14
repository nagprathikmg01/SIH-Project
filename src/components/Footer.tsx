import { motion } from 'motion/react';
import { 
  Wheat, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  HelpCircle,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ExternalLink
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Footer() {
  const quickLinks = [
    { title: 'Home', href: '#home' },
    { title: 'Crops', href: '#crops' },
    { title: 'Soil Analysis', href: '#soil' },
    { title: 'AI Predictions', href: '#predictions' },
    { title: 'Profile', href: '#profile' }
  ];

  const supportLinks = [
    { title: 'Help Center', icon: HelpCircle },
    { title: 'Contact Support', icon: MessageSquare },
    { title: 'User Guide', icon: ExternalLink },
    { title: 'FAQs', icon: HelpCircle }
  ];

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'KN', name: 'ಕನ್ನಡ' },
    { code: 'HI', name: 'हिंदी' }
  ];

  return (
    <footer className="bg-gradient-to-b from-karnataka-green to-soil-dark text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-karnataka-orange to-crop-yellow rounded-lg flex items-center justify-center">
                <Wheat className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl">KarnatakaKrishi</h3>
                <p className="text-sm text-white/80">Smart Farming Solutions</p>
              </div>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Empowering Karnataka's farmers with AI-driven insights, weather predictions, 
              and precision agriculture solutions for sustainable farming.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors hover:underline"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <h5 className="text-sm mb-3 text-white/90">Featured</h5>
              <Badge className="bg-karnataka-orange/20 text-karnataka-orange mb-2 mr-2">
                Weather Alerts
              </Badge>
              <Badge className="bg-crop-yellow/20 text-crop-yellow mb-2">
                Market Prices
              </Badge>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                    <link.icon className="h-4 w-4" />
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <h5 className="text-sm mb-3 text-white/90">Emergency Support</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-karnataka-orange" />
                  <span>1800-123-FARM</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MessageSquare className="h-4 w-4 text-karnataka-orange" />
                  <span>WhatsApp Support</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact & Language */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg mb-6">Contact</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-karnataka-orange mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm">Karnataka Agricultural Department</p>
                  <p className="text-sm text-white/80">Bangalore, Karnataka 560001</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-karnataka-orange" />
                <a href="mailto:support@karnatakakrishi.gov.in" className="text-sm hover:underline">
                  support@karnatakakrishi.gov.in
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-karnataka-orange" />
                <span className="text-sm">+91 80 2235 4567</span>
              </div>
            </div>
            
            {/* Language Switcher */}
            <div>
              <h5 className="text-sm mb-3 text-white/90 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Language
              </h5>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white hover:text-karnataka-green text-xs"
                  >
                    {lang.code}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-white/70">
              <p>&copy; 2024 KarnatakaKrishi. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              
              <div className="text-xs text-white/60">
                Last updated: Sep 14, 2024
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions - Mobile */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden z-30"
      >
        <div className="flex">
          <Button className="flex-1 rounded-none bg-karnataka-green hover:bg-karnataka-green/90 h-16">
            <Phone className="h-5 w-5 mr-2" />
            Call Support
          </Button>
          <Button className="flex-1 rounded-none bg-karnataka-orange hover:bg-karnataka-orange/90 h-16">
            <MessageSquare className="h-5 w-5 mr-2" />
            WhatsApp
          </Button>
        </div>
      </motion.div>

      {/* Language Floating Button - Mobile */}
      <div className="fixed bottom-20 left-4 md:hidden z-30">
        <Button
          size="sm"
          className="rounded-full bg-white/90 text-karnataka-green hover:bg-white shadow-lg"
        >
          <Globe className="h-4 w-4 mr-1" />
          EN
        </Button>
      </div>
    </footer>
  );
}
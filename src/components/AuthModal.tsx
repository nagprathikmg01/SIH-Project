import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff,
  Wheat,
  MapPin,
  Calendar,
  UserPlus,
  LogIn,
  Globe
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    district: '',
    farmSize: '',
    experience: '',
    language: 'Kannada',
    acceptTerms: false
  });

  const districts = [
    'Bangalore Rural', 'Bangalore Urban', 'Mysore', 'Hassan', 'Mandya', 
    'Tumkur', 'Belgaum', 'Hubli-Dharwad', 'Gulbarga', 'Bijapur',
    'Bellary', 'Raichur', 'Koppal', 'Gadag', 'Haveri', 'Uttara Kannada',
    'Dakshina Kannada', 'Udupi', 'Shimoga', 'Chikmagalur', 'Kodagu',
    'Chitradurga', 'Davanagere', 'Kolar', 'Chikballapur', 'Yadgir',
    'Ramanagara', 'Bagalkot', 'Vijayapura', 'Chamarajanagar'
  ];

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login attempt:', loginData);
    onSuccess?.();
    onClose();
  };

  const handleSignup = () => {
    // Handle signup logic here
    console.log('Signup attempt:', signupData);
    onSuccess?.();
    onClose();
  };

  const updateLoginData = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const updateSignupData = (field: string, value: any) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-karnataka-green to-leaf-green rounded-lg flex items-center justify-center">
              <Wheat className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl text-karnataka-green">KarnatakaKrishi</DialogTitle>
              <p className="text-sm text-muted-foreground">Join the Smart Farming Revolution</p>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Sign In Tab */}
          <TabsContent value="login" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="login-email">Email or Phone</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email or phone"
                    value={loginData.email}
                    onChange={(e) => updateLoginData('email', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => updateLoginData('password', e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <Button variant="link" size="sm" className="text-karnataka-green">
                  Forgot password?
                </Button>
              </div>

              <Button 
                onClick={handleLogin}
                className="w-full bg-karnataka-green hover:bg-karnataka-green/90"
                size="lg"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  New to farming? Get instant access to AI predictions and expert guidance!
                </p>
              </div>
            </motion.div>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      placeholder="Enter your full name"
                      value={signupData.name}
                      onChange={(e) => updateSignupData('name', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={(e) => updateSignupData('email', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-phone"
                      placeholder="+91 98765 43210"
                      value={signupData.phone}
                      onChange={(e) => updateSignupData('phone', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-district">District</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Select value={signupData.district} onValueChange={(value) => updateSignupData('district', value)}>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select your district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="signup-farmsize">Farm Size</Label>
                    <Select value={signupData.farmSize} onValueChange={(value) => updateSignupData('farmSize', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less than 1 acre">{"< 1 acre"}</SelectItem>
                        <SelectItem value="1-5 acres">1-5 acres</SelectItem>
                        <SelectItem value="5-10 acres">5-10 acres</SelectItem>
                        <SelectItem value="10+ acres">10+ acres</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="signup-experience">Experience</Label>
                    <Select value={signupData.experience} onValueChange={(value) => updateSignupData('experience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="1-5 years">1-5 years</SelectItem>
                        <SelectItem value="5-10 years">5-10 years</SelectItem>
                        <SelectItem value="10+ years">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-language">Preferred Language</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Select value={signupData.language} onValueChange={(value) => updateSignupData('language', value)}>
                      <SelectTrigger className="pl-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kannada">ಕನ್ನಡ (Kannada)</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Hindi">हिंदी (Hindi)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={signupData.password}
                      onChange={(e) => updateSignupData('password', e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) => updateSignupData('confirmPassword', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={signupData.acceptTerms}
                  onCheckedChange={(checked) => updateSignupData('acceptTerms', checked)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the{' '}
                  <Button variant="link" size="sm" className="h-auto p-0 text-karnataka-green">
                    Terms of Service
                  </Button>
                  {' '}and{' '}
                  <Button variant="link" size="sm" className="h-auto p-0 text-karnataka-green">
                    Privacy Policy
                  </Button>
                </Label>
              </div>

              <Button 
                onClick={handleSignup}
                disabled={!signupData.acceptTerms}
                className="w-full bg-karnataka-green hover:bg-karnataka-green/90"
                size="lg"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create Account
              </Button>

              <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground">
                  Join 25,000+ Karnataka farmers already using AI-powered insights
                </p>
                <div className="flex justify-center gap-2">
                  <Badge variant="outline" className="text-xs">Free Forever</Badge>
                  <Badge variant="outline" className="text-xs">No Hidden Costs</Badge>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Alternative Sign In Methods */}
        <div className="border-t pt-4 space-y-3">
          <p className="text-center text-sm text-muted-foreground">Or continue with</p>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm">
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Phone OTP
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
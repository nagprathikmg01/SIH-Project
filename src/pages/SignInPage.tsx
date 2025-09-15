import { useState } from 'react';
import { motion } from 'motion/react';
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
  Globe,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function SignInPage() {
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
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, signup, loading } = useAuth();
  const navigate = useNavigate();

  const districts = [
    'Bangalore Rural', 'Bangalore Urban', 'Mysore', 'Hassan', 'Mandya', 
    'Tumkur', 'Belgaum', 'Hubli-Dharwad', 'Gulbarga', 'Bijapur',
    'Bellary', 'Raichur', 'Koppal', 'Gadag', 'Haveri', 'Uttara Kannada',
    'Dakshina Kannada', 'Udupi', 'Shimoga', 'Chikmagalur', 'Kodagu',
    'Chitradurga', 'Davanagere', 'Kolar', 'Chikballapur', 'Yadgir',
    'Ramanagara', 'Bagalkot', 'Vijayapura', 'Chamarajanagar'
  ];

  const handleLogin = async () => {
    setError('');
    setSuccess('');
    
    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(loginData.email, loginData.password);
    if (success) {
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSignup = async () => {
    setError('');
    setSuccess('');

    if (!signupData.name || !signupData.email || !signupData.password || !signupData.district) {
      setError('Please fill in all required fields');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!signupData.acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    const success = await signup({
      name: signupData.name,
      email: signupData.email,
      phone: signupData.phone,
      password: signupData.password,
      district: signupData.district,
      farmSize: signupData.farmSize,
      experience: signupData.experience,
      language: signupData.language,
      notifications: true,
      weatherAlerts: true,
      marketUpdates: true
    });

    if (success) {
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setError('Email already exists. Please use a different email.');
    }
  };

  const updateLoginData = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const updateSignupData = (field: string, value: any) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-karnataka-green/5 via-white to-leaf-green/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-karnataka-green hover:text-karnataka-orange"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="text-center p-6 bg-gradient-to-r from-karnataka-green/10 to-leaf-green/10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-karnataka-green to-leaf-green rounded-xl flex items-center justify-center">
                <Wheat className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-karnataka-green font-bold">KarnatakaKrishi</h1>
                <p className="text-sm text-muted-foreground">Smart Farming Platform</p>
              </div>
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          {/* Tabs */}
          <div className="p-6">
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
              <TabsContent value="login" className="space-y-4 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="login-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
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
                    disabled={loading}
                    className="w-full bg-karnataka-green hover:bg-karnataka-green/90"
                    size="lg"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing In...
                      </div>
                    ) : (
                      <>
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Demo accounts: rajesh.gowda@gmail.com, priya.sharma@gmail.com, kumar.reddy@gmail.com
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Password: password123</p>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="signup-name">Full Name *</Label>
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
                      <Label htmlFor="signup-email">Email Address *</Label>
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
                      <Label htmlFor="signup-district">District *</Label>
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
                      <Label htmlFor="signup-password">Password *</Label>
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
                      <Label htmlFor="signup-confirm-password">Confirm Password *</Label>
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
                    disabled={!signupData.acceptTerms || loading}
                    className="w-full bg-karnataka-green hover:bg-karnataka-green/90"
                    size="lg"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating Account...
                      </div>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Create Account
                      </>
                    )}
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}

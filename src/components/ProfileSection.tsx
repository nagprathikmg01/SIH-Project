import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Edit3, 
  Camera, 
  Save,
  Settings,
  Award,
  Calendar,
  TrendingUp,
  Wheat,
  Target,
  Star,
  Clock,
  FileText,
  PlusCircle,
  Shield,
  Globe,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { useAuth } from '../contexts/AuthContext';

export function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUser } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.district || '',
    address: user?.address || '',
    farmSize: user?.farmSize || '',
    experience: user?.experience || '',
    mainCrops: user?.mainCrops || [],
    farmType: user?.farmType || '',
    language: user?.language || 'Kannada',
    notifications: user?.notifications ?? true,
    weatherAlerts: user?.weatherAlerts ?? true,
    marketUpdates: user?.marketUpdates ?? true
  });

  const farmHistory = [
    {
      season: 'Kharif 2024',
      crop: 'Sugarcane',
      area: '8 acres',
      yield: '95 tons/acre',
      profit: '₹4,20,000',
      status: 'Completed'
    },
    {
      season: 'Rabi 2023-24',
      crop: 'Rice (Basmati)',
      area: '4 acres',
      yield: '42 quintal/acre',
      profit: '₹1,80,000',
      status: 'Completed'
    },
    {
      season: 'Summer 2024',
      crop: 'Coconut',
      area: '2 acres',
      yield: '12,000 nuts',
      profit: '₹85,000',
      status: 'Ongoing'
    }
  ];

  const achievements = [
    {
      title: 'Best Yield Award',
      description: 'Highest sugarcane yield in Mandya district',
      date: '2024',
      icon: '🏆',
      level: 'Gold'
    },
    {
      title: 'Smart Farmer',
      description: 'Adopted 5+ AI recommendations',
      date: '2024',
      icon: '🧠',
      level: 'Platinum'
    },
    {
      title: 'Sustainable Practices',
      description: 'Implemented organic farming methods',
      date: '2023',
      icon: '🌱',
      level: 'Silver'
    },
    {
      title: 'Community Leader',
      description: 'Helped 50+ farmers in the region',
      date: '2023',
      icon: '👥',
      level: 'Gold'
    }
  ];

  const recentActivities = [
    {
      action: 'Received AI prediction for Rabi season',
      time: '2 hours ago',
      type: 'prediction'
    },
    {
      action: 'Updated soil test results',
      time: '1 day ago',
      type: 'soil'
    },
    {
      action: 'Marked sugarcane harvest complete',
      time: '3 days ago',
      type: 'harvest'
    },
    {
      action: 'Joined WhatsApp group - Mandya Farmers',
      time: '1 week ago',
      type: 'community'
    }
  ];

  const updateProfile = (field: string, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const saveProfile = () => {
    updateUser(profileData);
    setIsEditing(false);
    console.log('Profile saved:', profileData);
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'platinum': return 'bg-purple-100 text-purple-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'prediction': return '🔮';
      case 'soil': return '🌱';
      case 'harvest': return '🚜';
      case 'community': return '👥';
      default: return '📝';
    }
  };

  return (
    <section id="profile" className="py-20 bg-gradient-to-b from-white to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-karnataka-green/10 text-karnataka-green">
            <User className="h-4 w-4 mr-2" />
            Farmer Profile
          </Badge>
          <h2 className="text-4xl text-karnataka-green mb-4">
            Your Farming Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track your progress, manage your farm details, and showcase your achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24 mx-auto border-4 border-karnataka-orange">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBmYXJtZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE2OTI5MDgwNjN8MA&ixlib=rb-4.1.0&q=80&w=150" />
                    <AvatarFallback className="text-xl bg-karnataka-green text-white">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-6 rounded-full w-8 h-8 p-0 bg-karnataka-orange hover:bg-karnataka-orange/90"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl text-karnataka-green">{profileData.name}</h3>
                  <p className="text-muted-foreground">{profileData.farmType}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-karnataka-orange" />
                    <span className="text-sm">{profileData.location}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-gradient-to-br from-karnataka-green/10 to-leaf-green/10 rounded-lg">
                    <Wheat className="h-6 w-6 mx-auto text-karnataka-green mb-1" />
                    <p className="text-sm font-medium">{profileData.farmSize}</p>
                    <p className="text-xs text-muted-foreground">Farm Size</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-karnataka-orange/10 to-crop-yellow/10 rounded-lg">
                    <Clock className="h-6 w-6 mx-auto text-karnataka-orange mb-1" />
                    <p className="text-sm font-medium">{profileData.experience}</p>
                    <p className="text-xs text-muted-foreground">Experience</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Main Crops</p>
                  <div className="flex flex-wrap gap-1">
                    {profileData.mainCrops.map((crop, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Profile Completion</span>
                    <span className="text-sm text-karnataka-green">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <Button 
                  className="w-full bg-karnataka-green hover:bg-karnataka-green/90"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </Button>
              </CardContent>
            </Card>
            
            {/* Quick Stats */}
            <Card className="mt-6 bg-gradient-to-br from-karnataka-green/5 to-leaf-green/5 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-karnataka-green">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Harvests</span>
                    <Badge className="bg-green-100 text-green-800">24</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AI Predictions Used</span>
                    <Badge className="bg-blue-100 text-blue-800">18</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Community Rank</span>
                    <Badge className="bg-karnataka-orange/20 text-karnataka-orange">#47</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Success Rate</span>
                    <Badge className="bg-green-100 text-green-800">94%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="history">Farm History</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Personal Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-karnataka-green">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => updateProfile('name', e.target.value)}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-secondary/30' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => updateProfile('phone', e.target.value)}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-secondary/30' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => updateProfile('email', e.target.value)}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-secondary/30' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">District</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => updateProfile('location', e.target.value)}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-secondary/30' : ''}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Full Address</Label>
                      <Textarea
                        id="address"
                        value={profileData.address}
                        onChange={(e) => updateProfile('address', e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-secondary/30' : ''}
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-karnataka-green">
                      <Wheat className="h-5 w-5" />
                      Farm Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="farmSize">Farm Size</Label>
                        <Input
                          id="farmSize"
                          value={profileData.farmSize}
                          onChange={(e) => updateProfile('farmSize', e.target.value)}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-secondary/30' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="experience">Farming Experience</Label>
                        <Input
                          id="experience"
                          value={profileData.experience}
                          onChange={(e) => updateProfile('experience', e.target.value)}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-secondary/30' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="farmType">Farm Type</Label>
                        <Select 
                          value={profileData.farmType} 
                          onValueChange={(value) => updateProfile('farmType', value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className={!isEditing ? 'bg-secondary/30' : ''}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mixed Farming">Mixed Farming</SelectItem>
                            <SelectItem value="Organic Farming">Organic Farming</SelectItem>
                            <SelectItem value="Commercial Farming">Commercial Farming</SelectItem>
                            <SelectItem value="Subsistence Farming">Subsistence Farming</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="language">Preferred Language</Label>
                        <Select 
                          value={profileData.language} 
                          onValueChange={(value) => updateProfile('language', value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className={!isEditing ? 'bg-secondary/30' : ''}>
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
                  </CardContent>
                </Card>

                {isEditing && (
                  <div className="flex gap-4">
                    <Button 
                      onClick={saveProfile}
                      className="bg-karnataka-green hover:bg-karnataka-green/90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Farm History Tab */}
              <TabsContent value="history" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2 text-karnataka-green">
                        <Calendar className="h-5 w-5" />
                        Farming History
                      </CardTitle>
                      <Button size="sm" className="bg-karnataka-orange hover:bg-karnataka-orange/90">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Entry
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {farmHistory.map((entry, index) => (
                        <div key={index} className="p-4 border rounded-lg hover:bg-secondary/30 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-karnataka-green">{entry.crop}</h4>
                              <p className="text-sm text-muted-foreground">{entry.season}</p>
                            </div>
                            <Badge className={entry.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                              {entry.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Area</p>
                              <p className="font-medium">{entry.area}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Yield</p>
                              <p className="font-medium">{entry.yield}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Profit</p>
                              <p className="font-medium text-karnataka-green">{entry.profit}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-karnataka-green">
                      <FileText className="h-5 w-5" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors">
                          <span className="text-lg">{getActivityIcon(activity.type)}</span>
                          <div className="flex-1">
                            <p className="text-sm">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-karnataka-green">
                      <Award className="h-5 w-5" />
                      Achievements & Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 border rounded-lg hover:shadow-md transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{achievement.icon}</span>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-karnataka-green">{achievement.title}</h4>
                                <Badge className={getLevelColor(achievement.level)}>
                                  {achievement.level}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                              <p className="text-xs text-muted-foreground">{achievement.date}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-karnataka-green">
                      <Settings className="h-5 w-5" />
                      Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <Label htmlFor="notifications">App Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive general app notifications</p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={profileData.notifications}
                        onCheckedChange={(checked) => updateProfile('notifications', checked)}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <Label htmlFor="weather">Weather Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get weather and climate updates</p>
                      </div>
                      <Switch
                        id="weather"
                        checked={profileData.weatherAlerts}
                        onCheckedChange={(checked) => updateProfile('weatherAlerts', checked)}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <Label htmlFor="market">Market Updates</Label>
                        <p className="text-sm text-muted-foreground">Receive crop price and market information</p>
                      </div>
                      <Switch
                        id="market"
                        checked={profileData.marketUpdates}
                        onCheckedChange={(checked) => updateProfile('marketUpdates', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-karnataka-green">
                      <Shield className="h-5 w-5" />
                      Privacy & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-600">
                      <User className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
import { motion } from 'motion/react';
import { useState } from 'react';
import { Star, MessageSquare, Users, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Mandya District',
      occupation: 'Sugarcane Farmer',
      image: 'https://images.unsplash.com/photo-1707721690544-781fe6ede937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBmYXJtZXIlMjBhZ3JpY3VsdHVyZSUyMGNyb3BzfGVufDF8fHx8MTc1Nzg2NzI2Nnww&ixlib=rb-4.1.0&q=80&w=200',
      rating: 5,
      testimonial: "KarnatakaKrishi's AI predictions helped me increase my sugarcane yield by 35% last season. The soil analysis was spot-on and the disease alerts saved my crop from potential losses.",
      cropGrown: 'Sugarcane',
      yieldIncrease: '35%',
      revenue: '₹3.2L'
    },
    {
      name: 'Lakshmi Devi',
      location: 'Hassan District',
      occupation: 'Coffee Grower',
      image: 'https://images.unsplash.com/photo-1620684565173-cc2e881557dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2lsJTIwZmFybWluZyUyMGhhbmRzfGVufDF8fHx8MTc1Nzc0OTAwMXww&ixlib=rb-4.1.0&q=80&w=200',
      rating: 5,
      testimonial: "The weather predictions and market price alerts through the app helped me time my coffee harvest perfectly. Made 40% more profit than last year!",
      cropGrown: 'Coffee',
      yieldIncrease: '28%',
      revenue: '₹4.8L'
    },
    {
      name: 'Suresh Gowda',
      location: 'Tumkur District',
      occupation: 'Multi-crop Farmer',
      image: 'https://images.unsplash.com/photo-1661153106674-8b377f435a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLYXJuYXRha2ElMjBmYXJtbGFuZCUyMGdyZWVuJTIwZmllbGRzfGVufDF8fHx8MTc1Nzg2NzI2Nnww&ixlib=rb-4.1.0&q=80&w=200',
      rating: 5,
      testimonial: "From groundnut to cotton, the crop recommendations were incredibly accurate. The risk assessment helped me make informed decisions and avoid losses.",
      cropGrown: 'Mixed Crops',
      yieldIncrease: '42%',
      revenue: '₹2.8L'
    }
  ];

  const successStories = [
    {
      title: 'From Traditional to Smart Farming',
      farmer: 'Manjunath Reddy',
      location: 'Bangalore Rural',
      story: 'Switched from traditional methods to AI-guided farming, resulting in 60% higher profits.',
      image: 'https://images.unsplash.com/photo-1655903724829-37b3cd3d4ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGFkZHklMjBmaWVsZHMlMjBncmVlbnxlbnwxfHx8fDE3NTc4NjcyNjd8MA&ixlib=rb-4.1.0&q=80&w=400',
      achievement: '60% Profit Increase'
    },
    {
      title: 'Pest Management Success',
      farmer: 'Priya Kumari',
      location: 'Belgaum',
      story: 'Early pest detection through app alerts helped save entire cotton crop worth ₹5 lakhs.',
      image: 'https://images.unsplash.com/photo-1620684565173-cc2e881557dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2lsJTIwZmFybWluZyUyMGhhbmRzfGVufDF8fHx8MTc1Nzc0OTAwMXww&ixlib=rb-4.1.0&q=80&w=400',
      achievement: '₹5L Crop Saved'
    },
    {
      title: 'Market Timing Mastery',
      farmer: 'Venkatesh Naik',
      location: 'Mysore',
      story: 'Perfect market timing using price predictions led to maximum returns on paddy sales.',
      image: 'https://images.unsplash.com/photo-1707721690544-781fe6ede937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBmYXJtZXIlMjBhZ3JpY3VsdHVyZSUyMGNyb3BzfGVufDF8fHx8MTc1Nzg2NzI2Nnww&ixlib=rb-4.1.0&q=80&w=400',
      achievement: 'Perfect Timing'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-karnataka-orange/10 text-karnataka-orange">
            <Star className="h-4 w-4 mr-2" />
            Success Stories
          </Badge>
          <h2 className="text-4xl text-karnataka-green mb-4">
            What Karnataka Farmers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories from farmers who transformed their yields using our AI-powered platform
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-karnataka-green/5 to-leaf-green/5 border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <Avatar className="w-24 h-24 border-4 border-karnataka-orange">
                    <AvatarImage src={testimonials[currentTestimonial].image} />
                    <AvatarFallback>{testimonials[currentTestimonial].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-karnataka-orange fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg md:text-xl text-muted-foreground mb-6 italic leading-relaxed">
                    "{testimonials[currentTestimonial].testimonial}"
                  </blockquote>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="text-xl text-karnataka-green mb-1">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-muted-foreground">
                        {testimonials[currentTestimonial].occupation}, {testimonials[currentTestimonial].location}
                      </p>
                    </div>
                    
                    <div className="flex gap-4 mt-4 md:mt-0">
                      <div className="text-center">
                        <Badge className="bg-green-100 text-green-800 mb-1">
                          {testimonials[currentTestimonial].yieldIncrease}
                        </Badge>
                        <p className="text-xs text-muted-foreground">Yield Increase</p>
                      </div>
                      <div className="text-center">
                        <Badge className="bg-karnataka-orange/20 text-karnataka-orange mb-1">
                          {testimonials[currentTestimonial].revenue}
                        </Badge>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex justify-center items-center mt-8 gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? 'bg-karnataka-green w-6' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Community Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl text-karnataka-green mb-4">Community Success Stories</h3>
            <p className="text-lg text-muted-foreground">
              Inspiring journeys of farmers who achieved remarkable results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white border-0 shadow-lg">
                  <div className="relative">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-karnataka-orange/90 text-white">
                        {story.achievement}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-lg text-karnataka-green mb-2">{story.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{story.story}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{story.farmer}</p>
                        <p className="text-sm text-muted-foreground">{story.location}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-karnataka-green">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-karnataka-green to-leaf-green text-white border-0 shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <Users className="h-16 w-16 mx-auto mb-6 opacity-80" />
              <h3 className="text-3xl mb-4">Join Our Farming Community</h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Connect with 25,000+ Karnataka farmers, share experiences, and learn from success stories. 
                Get instant support and expert advice.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-karnataka-green hover:bg-white/90 px-8"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Join WhatsApp Group
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-karnataka-green px-8"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Visit Community Forum
                </Button>
              </div>
              
              <div className="flex justify-center items-center gap-8 mt-8 text-sm opacity-80">
                <div className="text-center">
                  <p className="text-2xl font-bold">25K+</p>
                  <p>Active Farmers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">500+</p>
                  <p>Daily Discussions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">95%</p>
                  <p>Problem Resolution</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
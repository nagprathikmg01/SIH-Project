import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface District {
  id: string;
  name: string;
  coordinates: { x: number; y: number };
  soilType: string;
  rainfall: string;
  temperature: string;
  crops: string[];
  suitability: number;
  population: string;
  area: string;
  mainIndustries: string[];
}

interface KarnatakaMapProps {
  selectedDistrict?: District | null;
  onDistrictSelect: (district: District) => void;
  userDistrict?: string;
}

export function KarnatakaMap({ selectedDistrict, onDistrictSelect, userDistrict }: KarnatakaMapProps) {
  const districts: District[] = [
    {
      id: 'bangalore-rural',
      name: 'Bangalore Rural',
      coordinates: { x: 65, y: 45 },
      soilType: 'Red Laterite',
      rainfall: '850mm',
      temperature: '25-30°C',
      crops: ['Rice', 'Ragi', 'Sugarcane', 'Vegetables'],
      suitability: 95,
      population: '9.9 Lakhs',
      area: '2,298 sq km',
      mainIndustries: ['Agriculture', 'IT', 'Manufacturing']
    },
    {
      id: 'bangalore-urban',
      name: 'Bangalore Urban',
      coordinates: { x: 65, y: 40 },
      soilType: 'Red Laterite',
      rainfall: '970mm',
      temperature: '24-29°C',
      crops: ['Vegetables', 'Flowers', 'Fruits'],
      suitability: 85,
      population: '96.2 Lakhs',
      area: '2,190 sq km',
      mainIndustries: ['IT', 'Biotechnology', 'Aerospace']
    },
    {
      id: 'mysore',
      name: 'Mysore',
      coordinates: { x: 55, y: 65 },
      soilType: 'Red Loamy',
      rainfall: '750mm',
      temperature: '22-28°C',
      crops: ['Coffee', 'Cardamom', 'Rice', 'Maize'],
      suitability: 90,
      population: '30.0 Lakhs',
      area: '6,268 sq km',
      mainIndustries: ['Tourism', 'Silk', 'Agriculture']
    },
    {
      id: 'hassan',
      name: 'Hassan',
      coordinates: { x: 50, y: 55 },
      soilType: 'Black Cotton',
      rainfall: '1200mm',
      temperature: '20-26°C',
      crops: ['Coffee', 'Areca Nut', 'Cardamom', 'Pepper'],
      suitability: 88,
      population: '17.7 Lakhs',
      area: '6,814 sq km',
      mainIndustries: ['Coffee', 'Tourism', 'Agriculture']
    },
    {
      id: 'mandya',
      name: 'Mandya',
      coordinates: { x: 60, y: 60 },
      soilType: 'Alluvial',
      rainfall: '650mm',
      temperature: '24-29°C',
      crops: ['Sugarcane', 'Rice', 'Ragi', 'Pulses'],
      suitability: 92,
      population: '18.1 Lakhs',
      area: '4,961 sq km',
      mainIndustries: ['Sugar', 'Agriculture', 'Textiles']
    },
    {
      id: 'tumkur',
      name: 'Tumkur',
      coordinates: { x: 60, y: 50 },
      soilType: 'Red Sandy',
      rainfall: '600mm',
      temperature: '25-32°C',
      crops: ['Groundnut', 'Cotton', 'Maize', 'Millets'],
      suitability: 85,
      population: '26.8 Lakhs',
      area: '10,598 sq km',
      mainIndustries: ['Agriculture', 'Mining', 'Manufacturing']
    },
    {
      id: 'belgaum',
      name: 'Belgaum',
      coordinates: { x: 30, y: 35 },
      soilType: 'Black',
      rainfall: '550mm',
      temperature: '26-35°C',
      crops: ['Cotton', 'Sugarcane', 'Jowar', 'Maize'],
      suitability: 87,
      population: '47.8 Lakhs',
      area: '13,415 sq km',
      mainIndustries: ['Sugar', 'Textiles', 'Agriculture']
    },
    {
      id: 'hubli-dharwad',
      name: 'Hubli-Dharwad',
      coordinates: { x: 35, y: 40 },
      soilType: 'Black',
      rainfall: '600mm',
      temperature: '25-34°C',
      crops: ['Cotton', 'Sugarcane', 'Jowar', 'Groundnut'],
      suitability: 86,
      population: '18.5 Lakhs',
      area: '4,230 sq km',
      mainIndustries: ['Education', 'Agriculture', 'Manufacturing']
    },
    {
      id: 'gulbarga',
      name: 'Gulbarga',
      coordinates: { x: 45, y: 30 },
      soilType: 'Black',
      rainfall: '500mm',
      temperature: '26-36°C',
      crops: ['Jowar', 'Cotton', 'Groundnut', 'Sunflower'],
      suitability: 82,
      population: '25.6 Lakhs',
      area: '10,951 sq km',
      mainIndustries: ['Agriculture', 'Cement', 'Textiles']
    },
    {
      id: 'bijapur',
      name: 'Bijapur',
      coordinates: { x: 40, y: 25 },
      soilType: 'Black',
      rainfall: '450mm',
      temperature: '27-37°C',
      crops: ['Jowar', 'Cotton', 'Groundnut', 'Sunflower'],
      suitability: 80,
      population: '21.7 Lakhs',
      area: '10,517 sq km',
      mainIndustries: ['Agriculture', 'Tourism', 'Mining']
    },
    {
      id: 'bellary',
      name: 'Bellary',
      coordinates: { x: 50, y: 25 },
      soilType: 'Red Sandy',
      rainfall: '500mm',
      temperature: '26-36°C',
      crops: ['Cotton', 'Groundnut', 'Sunflower', 'Jowar'],
      suitability: 78,
      population: '25.3 Lakhs',
      area: '8,439 sq km',
      mainIndustries: ['Mining', 'Steel', 'Agriculture']
    },
    {
      id: 'raichur',
      name: 'Raichur',
      coordinates: { x: 55, y: 30 },
      soilType: 'Black',
      rainfall: '550mm',
      temperature: '26-35°C',
      crops: ['Cotton', 'Jowar', 'Groundnut', 'Sunflower'],
      suitability: 81,
      population: '19.2 Lakhs',
      area: '8,386 sq km',
      mainIndustries: ['Power', 'Agriculture', 'Mining']
    },
    {
      id: 'koppal',
      name: 'Koppal',
      coordinates: { x: 45, y: 35 },
      soilType: 'Red Sandy',
      rainfall: '500mm',
      temperature: '26-36°C',
      crops: ['Cotton', 'Groundnut', 'Jowar', 'Sunflower'],
      suitability: 79,
      population: '13.9 Lakhs',
      area: '5,565 sq km',
      mainIndustries: ['Agriculture', 'Mining', 'Textiles']
    },
    {
      id: 'gadag',
      name: 'Gadag',
      coordinates: { x: 40, y: 40 },
      soilType: 'Black',
      rainfall: '550mm',
      temperature: '25-34°C',
      crops: ['Cotton', 'Jowar', 'Groundnut', 'Sugarcane'],
      suitability: 83,
      population: '10.6 Lakhs',
      area: '4,656 sq km',
      mainIndustries: ['Agriculture', 'Textiles', 'Mining']
    },
    {
      id: 'haveri',
      name: 'Haveri',
      coordinates: { x: 45, y: 45 },
      soilType: 'Black',
      rainfall: '600mm',
      temperature: '25-33°C',
      crops: ['Cotton', 'Sugarcane', 'Jowar', 'Groundnut'],
      suitability: 84,
      population: '15.9 Lakhs',
      area: '4,823 sq km',
      mainIndustries: ['Agriculture', 'Sugar', 'Textiles']
    },
    {
      id: 'uttara-kannada',
      name: 'Uttara Kannada',
      coordinates: { x: 25, y: 50 },
      soilType: 'Laterite',
      rainfall: '2000mm',
      temperature: '22-30°C',
      crops: ['Rice', 'Coconut', 'Areca Nut', 'Cashew'],
      suitability: 89,
      population: '14.3 Lakhs',
      area: '10,291 sq km',
      mainIndustries: ['Forestry', 'Tourism', 'Agriculture']
    },
    {
      id: 'dakshina-kannada',
      name: 'Dakshina Kannada',
      coordinates: { x: 30, y: 60 },
      soilType: 'Laterite',
      rainfall: '3500mm',
      temperature: '23-30°C',
      crops: ['Rice', 'Coconut', 'Areca Nut', 'Cashew'],
      suitability: 91,
      population: '20.9 Lakhs',
      area: '4,859 sq km',
      mainIndustries: ['Education', 'Banking', 'Agriculture']
    },
    {
      id: 'udupi',
      name: 'Udupi',
      coordinates: { x: 35, y: 65 },
      soilType: 'Laterite',
      rainfall: '3000mm',
      temperature: '23-30°C',
      crops: ['Rice', 'Coconut', 'Areca Nut', 'Cashew'],
      suitability: 90,
      population: '11.8 Lakhs',
      area: '3,880 sq km',
      mainIndustries: ['Tourism', 'Education', 'Agriculture']
    },
    {
      id: 'shimoga',
      name: 'Shimoga',
      coordinates: { x: 40, y: 55 },
      soilType: 'Red Loamy',
      rainfall: '1000mm',
      temperature: '22-30°C',
      crops: ['Rice', 'Sugarcane', 'Areca Nut', 'Coconut'],
      suitability: 87,
      population: '17.5 Lakhs',
      area: '8,477 sq km',
      mainIndustries: ['Agriculture', 'Tourism', 'Forestry']
    },
    {
      id: 'chikmagalur',
      name: 'Chikmagalur',
      coordinates: { x: 45, y: 60 },
      soilType: 'Red Loamy',
      rainfall: '1500mm',
      temperature: '18-26°C',
      crops: ['Coffee', 'Cardamom', 'Pepper', 'Areca Nut'],
      suitability: 93,
      population: '11.4 Lakhs',
      area: '7,201 sq km',
      mainIndustries: ['Coffee', 'Tourism', 'Agriculture']
    },
    {
      id: 'kodagu',
      name: 'Kodagu',
      coordinates: { x: 50, y: 70 },
      soilType: 'Red Loamy',
      rainfall: '2000mm',
      temperature: '18-25°C',
      crops: ['Coffee', 'Cardamom', 'Pepper', 'Orange'],
      suitability: 94,
      population: '5.5 Lakhs',
      area: '4,102 sq km',
      mainIndustries: ['Coffee', 'Tourism', 'Forestry']
    },
    {
      id: 'chitradurga',
      name: 'Chitradurga',
      coordinates: { x: 55, y: 45 },
      soilType: 'Red Sandy',
      rainfall: '500mm',
      temperature: '25-33°C',
      crops: ['Jowar', 'Groundnut', 'Cotton', 'Sunflower'],
      suitability: 77,
      population: '16.6 Lakhs',
      area: '8,440 sq km',
      mainIndustries: ['Mining', 'Agriculture', 'Textiles']
    },
    {
      id: 'davanagere',
      name: 'Davanagere',
      coordinates: { x: 50, y: 50 },
      soilType: 'Red Sandy',
      rainfall: '600mm',
      temperature: '25-33°C',
      crops: ['Cotton', 'Groundnut', 'Jowar', 'Sunflower'],
      suitability: 80,
      population: '19.5 Lakhs',
      area: '5,924 sq km',
      mainIndustries: ['Textiles', 'Agriculture', 'Education']
    },
    {
      id: 'kolar',
      name: 'Kolar',
      coordinates: { x: 70, y: 50 },
      soilType: 'Red Laterite',
      rainfall: '700mm',
      temperature: '24-31°C',
      crops: ['Ragi', 'Groundnut', 'Sunflower', 'Vegetables'],
      suitability: 83,
      population: '15.4 Lakhs',
      area: '3,969 sq km',
      mainIndustries: ['Agriculture', 'Mining', 'Textiles']
    },
    {
      id: 'chikballapur',
      name: 'Chikballapur',
      coordinates: { x: 70, y: 45 },
      soilType: 'Red Laterite',
      rainfall: '750mm',
      temperature: '24-30°C',
      crops: ['Ragi', 'Groundnut', 'Sunflower', 'Vegetables'],
      suitability: 85,
      population: '12.5 Lakhs',
      area: '4,208 sq km',
      mainIndustries: ['Agriculture', 'Mining', 'Textiles']
    },
    {
      id: 'yadgir',
      name: 'Yadgir',
      coordinates: { x: 50, y: 20 },
      soilType: 'Black',
      rainfall: '450mm',
      temperature: '27-37°C',
      crops: ['Jowar', 'Cotton', 'Groundnut', 'Sunflower'],
      suitability: 76,
      population: '11.7 Lakhs',
      area: '5,224 sq km',
      mainIndustries: ['Agriculture', 'Textiles', 'Mining']
    },
    {
      id: 'ramanagara',
      name: 'Ramanagara',
      coordinates: { x: 60, y: 55 },
      soilType: 'Red Laterite',
      rainfall: '800mm',
      temperature: '24-30°C',
      crops: ['Ragi', 'Groundnut', 'Sunflower', 'Vegetables'],
      suitability: 86,
      population: '10.8 Lakhs',
      area: '3,556 sq km',
      mainIndustries: ['Agriculture', 'Silk', 'Tourism']
    },
    {
      id: 'bagalkot',
      name: 'Bagalkot',
      coordinates: { x: 35, y: 30 },
      soilType: 'Black',
      rainfall: '500mm',
      temperature: '26-35°C',
      crops: ['Jowar', 'Cotton', 'Groundnut', 'Sunflower'],
      suitability: 81,
      population: '18.9 Lakhs',
      area: '6,575 sq km',
      mainIndustries: ['Agriculture', 'Sugar', 'Textiles']
    },
    {
      id: 'vijayapura',
      name: 'Vijayapura',
      coordinates: { x: 40, y: 20 },
      soilType: 'Black',
      rainfall: '400mm',
      temperature: '27-38°C',
      crops: ['Jowar', 'Cotton', 'Groundnut', 'Sunflower'],
      suitability: 75,
      population: '21.7 Lakhs',
      area: '10,517 sq km',
      mainIndustries: ['Agriculture', 'Tourism', 'Mining']
    },
    {
      id: 'chamarajanagar',
      name: 'Chamarajanagar',
      coordinates: { x: 60, y: 70 },
      soilType: 'Red Loamy',
      rainfall: '800mm',
      temperature: '22-29°C',
      crops: ['Coffee', 'Cardamom', 'Pepper', 'Rice'],
      suitability: 88,
      population: '10.2 Lakhs',
      area: '5,101 sq km',
      mainIndustries: ['Coffee', 'Tourism', 'Agriculture']
    }
  ];

  const getSuitabilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getDistrictColor = (district: District) => {
    if (selectedDistrict?.id === district.id) return '#f97316'; // Orange for selected
    if (userDistrict === district.name) return '#22c55e'; // Green for user's district
    return '#16a34a'; // Default green
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-karnataka-green">
          <MapPin className="h-5 w-5" />
          Karnataka Districts Map
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Click on districts to explore soil characteristics and suitable crops
        </p>
      </CardHeader>
      <CardContent>
        {/* Interactive Karnataka Map */}
        <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 h-96 overflow-hidden">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
          >
            {/* Karnataka outline (simplified) */}
            <path
              d="M20,30 L35,25 L45,20 L60,25 L75,30 L80,45 L75,60 L70,75 L60,80 L45,82 L30,80 L20,70 L15,55 L18,40 Z"
              fill="rgba(34, 139, 34, 0.1)"
              stroke="var(--karnataka-green)"
              strokeWidth="0.5"
            />
            
            {/* District markers */}
            {districts.map((district) => (
              <g key={district.id}>
                <circle
                  cx={district.coordinates.x}
                  cy={district.coordinates.y}
                  r="3"
                  fill={getDistrictColor(district)}
                  className="cursor-pointer hover:r-4 transition-all duration-200"
                  onClick={() => onDistrictSelect(district)}
                />
                <text
                  x={district.coordinates.x}
                  y={district.coordinates.y - 5}
                  textAnchor="middle"
                  className="text-xs fill-karnataka-green font-medium cursor-pointer"
                  onClick={() => onDistrictSelect(district)}
                >
                  {district.name.split(' ')[0]}
                </text>
              </g>
            ))}
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs mb-1">
              <div className="w-3 h-3 rounded-full bg-karnataka-green"></div>
              <span>Districts</span>
            </div>
            <div className="flex items-center gap-2 text-xs mb-1">
              <div className="w-3 h-3 rounded-full bg-karnataka-orange"></div>
              <span>Selected</span>
            </div>
            {userDistrict && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Your District</span>
              </div>
            )}
          </div>
        </div>

        {/* District Info */}
        {selectedDistrict && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-gradient-to-r from-karnataka-green/5 to-leaf-green/5 rounded-lg border border-karnataka-green/20"
          >
            <h4 className="text-lg text-karnataka-green mb-3 flex items-center gap-2">
              <Info className="h-4 w-4" />
              {selectedDistrict.name}
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="text-muted-foreground">Soil Type</p>
                <p className="font-medium">{selectedDistrict.soilType}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Rainfall</p>
                <p className="font-medium">{selectedDistrict.rainfall}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Temperature</p>
                <p className="font-medium">{selectedDistrict.temperature}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Suitability</p>
                <Badge className={getSuitabilityColor(selectedDistrict.suitability)}>
                  {selectedDistrict.suitability}%
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Population</p>
                <p className="font-medium">{selectedDistrict.population}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Area</p>
                <p className="font-medium">{selectedDistrict.area}</p>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-muted-foreground text-sm mb-2">Recommended Crops</p>
              <div className="flex flex-wrap gap-1">
                {selectedDistrict.crops.map((crop, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {crop}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-2">Main Industries</p>
              <div className="flex flex-wrap gap-1">
                {selectedDistrict.mainIndustries.map((industry, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

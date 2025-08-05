'use client';

import { useState } from 'react';
import { FrontOfficeNav } from '@/components/layout/front-office-nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bed, 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Pool, 
  AirVent,
  Tv,
  Coffee,
  Shower,
  Users,
  MapPin,
  Calendar,
  Filter,
  Search,
  Heart,
  Award,
  Shield
} from 'lucide-react';

interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  capacity: number;
  size: string;
  description: string;
  amenities: string[];
  image: string;
  available: boolean;
  rating: number;
}

export default function ChambresPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const rooms: Room[] = [
    {
      id: '1',
      name: 'Chambre Standard',
      type: 'standard',
      price: 25000,
      currency: 'FCFA',
      capacity: 2,
      size: '25m²',
      description: 'Chambre confortable avec décoration locale béninoise, parfaite pour un séjour d\'affaires ou de loisirs.',
      amenities: ['WiFi', 'Climatisation', 'TV', 'Salle de bain privée', 'Vue sur la ville'],
      image: '/images/room-standard.jpg',
      available: true,
      rating: 4.2
    },
    {
      id: '2',
      name: 'Chambre Deluxe',
      type: 'deluxe',
      price: 45000,
      currency: 'FCFA',
      capacity: 3,
      size: '35m²',
      description: 'Chambre spacieuse avec balcon privé offrant une vue magnifique sur la lagune de Cotonou.',
      amenities: ['WiFi', 'Climatisation', 'TV', 'Balcon privé', 'Mini-bar', 'Vue lagune'],
      image: '/images/room-deluxe.jpg',
      available: true,
      rating: 4.5
    },
    {
      id: '3',
      name: 'Suite Familiale',
      type: 'family',
      price: 65000,
      currency: 'FCFA',
      capacity: 4,
      size: '50m²',
      description: 'Suite spacieuse idéale pour les familles, avec séparation salon/chambre et décoration traditionnelle.',
      amenities: ['WiFi', 'Climatisation', 'TV', 'Salon séparé', '2 salles de bain', 'Vue jardin'],
      image: '/images/room-family.jpg',
      available: true,
      rating: 4.7
    },
    {
      id: '4',
      name: 'Suite Présidentielle',
      type: 'presidential',
      price: 85000,
      currency: 'FCFA',
      capacity: 2,
      size: '80m²',
      description: 'Suite de luxe avec vue panoramique, service butler et tous les équipements premium.',
      amenities: ['WiFi', 'Climatisation', 'TV', 'Balcon panoramique', 'Service butler', 'Jacuzzi'],
      image: '/images/room-presidential.jpg',
      available: true,
      rating: 4.9
    },
    {
      id: '5',
      name: 'Chambre Économique',
      type: 'economic',
      price: 18000,
      currency: 'FCFA',
      capacity: 1,
      size: '20m²',
      description: 'Chambre simple et confortable, parfaite pour les voyageurs au budget serré.',
      amenities: ['WiFi', 'Ventilateur', 'TV', 'Salle de bain privée'],
      image: '/images/room-economic.jpg',
      available: true,
      rating: 3.8
    },
    {
      id: '6',
      name: 'Chambre Business',
      type: 'business',
      price: 35000,
      currency: 'FCFA',
      capacity: 2,
      size: '30m²',
      description: 'Chambre spécialement conçue pour les voyageurs d\'affaires avec bureau et équipements modernes.',
      amenities: ['WiFi', 'Climatisation', 'TV', 'Bureau', 'Coffre-fort', 'Vue ville'],
      image: '/images/room-business.jpg',
      available: true,
      rating: 4.3
    }
  ];

  const filteredRooms = rooms.filter(room => {
    const searchMatch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = selectedType === 'all' || room.type === selectedType;
    const priceMatch = selectedPrice === 'all' || 
                      (selectedPrice === 'low' && room.price <= 25000) ||
                      (selectedPrice === 'medium' && room.price > 25000 && room.price <= 50000) ||
                      (selectedPrice === 'high' && room.price > 50000);
    
    return searchMatch && typeMatch && priceMatch;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'standard': return 'Standard';
      case 'deluxe': return 'Deluxe';
      case 'family': return 'Familiale';
      case 'presidential': return 'Présidentielle';
      case 'economic': return 'Économique';
      case 'business': return 'Business';
      default: return type;
    }
  };

  const getPriceLabel = (price: string) => {
    switch (price) {
      case 'low': return 'Économique (≤ 25 000 FCFA)';
      case 'medium': return 'Moyen (25 000 - 50 000 FCFA)';
      case 'high': return 'Premium (> 50 000 FCFA)';
      default: return 'Tous les prix';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <FrontOfficeNav currentPage="/front-office/chambres" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nos Chambres & Suites
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-200 max-w-3xl mx-auto">
            Découvrez nos chambres élégantes avec une touche d'authenticité béninoise
          </p>
          <div className="flex items-center justify-center gap-4 text-blue-200">
            <MapPin className="h-5 w-5" />
            <span>Cotonou, Bénin - Au cœur de l'Afrique de l'Ouest</span>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher une chambre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Type de chambre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="family">Familiale</SelectItem>
                <SelectItem value="presidential">Présidentielle</SelectItem>
                <SelectItem value="economic">Économique</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedPrice} onValueChange={setSelectedPrice}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Fourchette de prix" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les prix</SelectItem>
                <SelectItem value="low">Économique (≤ 25 000 FCFA)</SelectItem>
                <SelectItem value="medium">Moyen (25 000 - 50 000 FCFA)</SelectItem>
                <SelectItem value="high">Premium (> 50 000 FCFA)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Chambres Disponibles
            </h2>
            <p className="text-gray-600">
              {filteredRooms.length} chambre{filteredRooms.length > 1 ? 's' : ''} trouvée{filteredRooms.length > 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center relative">
                  <Bed className="h-16 w-16 text-white" />
                  <Badge className="absolute top-4 right-4 bg-orange-500 text-white">
                    {getTypeLabel(room.type)}
                  </Badge>
                  {!room.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge className="bg-red-500 text-white">Indisponible</Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                        {room.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Users className="h-4 w-4" />
                        <span>{room.capacity} personne{room.capacity > 1 ? 's' : ''}</span>
                        <span>•</span>
                        <span>{room.size}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {room.price.toLocaleString()} {room.currency}
                      </div>
                      <div className="text-sm text-gray-500">par nuit</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(room.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">({room.rating})</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {room.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {room.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{room.amenities.length - 3} autres
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={!room.available}
                      onClick={() => window.location.href = `/front-office/reservation?room=${room.id}`}
                    >
                      Réserver maintenant
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <Bed className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune chambre trouvée</h3>
              <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Services Inclus
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tous nos séjours incluent ces services pour votre confort
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wifi className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">WiFi Gratuit</h3>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Petit-déjeuner</h3>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Parking</h3>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Sécurité 24h</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à réserver votre séjour ?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Découvrez l'hospitalité béninoise dans un cadre moderne et authentique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold"
              onClick={() => window.location.href = '/front-office/reservation'}
            >
              Réserver maintenant
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-900"
              onClick={() => window.location.href = '/front-office/evenements'}
            >
              Organiser un événement
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 
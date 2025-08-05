'use client';

import { FrontOfficeNav } from '@/components/layout/front-office-nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Wifi, 
  Car, 
  Utensils, 
  Waves, 
  Shield, 
  Heart,
  Clock,
  Users,
  Award,
  Globe,
  Coffee,
  Music,
  Camera,
  Bed
} from 'lucide-react';

export default function FrontOfficePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <FrontOfficeNav currentPage="/front-office" />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/benin-hotel.jpg')] bg-cover bg-center"></div>
        
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <Badge className="mb-4 bg-orange-500 hover:bg-orange-600 text-white border-0">
            <Award className="h-3 w-3 mr-1" />
            Hôtel 4 Étoiles au Bénin
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Hôtel No-Stress
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Votre havre de paix au cœur de <span className="text-yellow-300 font-semibold">Cotonou</span>
          </p>
          
          <p className="text-lg mb-8 text-blue-200 max-w-2xl mx-auto">
            Découvrez l'hospitalité béninoise dans un cadre moderne et authentique. 
            Entre tradition et modernité, votre séjour sera inoubliable.
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
              onClick={() => window.location.href = '/front-office/chambres'}
            >
              Voir nos chambres
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Services Premium
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profitez de tous les services modernes dans un cadre authentiquement béninois
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wifi className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">WiFi Haute Vitesse</h3>
                <p className="text-gray-600">Connexion internet gratuite dans tout l'hôtel</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Transport</h3>
                <p className="text-gray-600">Navette aéroport et location de véhicules</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cuisine Béninoise</h3>
                <p className="text-gray-600">Restaurant avec spécialités locales et internationales</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Piscine</h3>
                <p className="text-gray-600">Piscine extérieure avec vue sur la lagune</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chambres Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Chambres Élégantes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des chambres modernes avec une touche d'authenticité béninoise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <Bed className="h-16 w-16 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Chambre Standard</h3>
                <p className="text-gray-600 mb-4">Confort moderne avec décoration locale</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">25 000 FCFA</span>
                  <span className="text-sm text-gray-500">/nuit</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Star className="h-16 w-16 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Chambre Deluxe</h3>
                <p className="text-gray-600 mb-4">Espace premium avec balcon privé</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">45 000 FCFA</span>
                  <span className="text-sm text-gray-500">/nuit</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
                <Award className="h-16 w-16 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Suite Présidentielle</h3>
                <p className="text-gray-600 mb-4">Luxe absolu avec vue panoramique</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">85 000 FCFA</span>
                  <span className="text-sm text-gray-500">/nuit</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Événements Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Événements & Réceptions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Organisez vos événements dans nos salles modernes avec service traiteur béninois
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">Salle de Conférence</h3>
                    <p className="text-gray-600">Jusqu'à 200 personnes</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Équipement audiovisuel moderne</li>
                  <li>• Service café et rafraîchissements</li>
                  <li>• Traiteur avec spécialités béninoises</li>
                  <li>• Parking sécurisé</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Réserver la salle
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">Mariages & Cérémonies</h3>
                    <p className="text-gray-600">Cérémonies traditionnelles et modernes</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Décoration traditionnelle béninoise</li>
                  <li>• Musique et danse locales</li>
                  <li>• Menu de mariage personnalisé</li>
                  <li>• Coordination événementielle</li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Planifier un événement
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Contactez-nous</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Notre équipe est là pour vous accueillir avec l'hospitalité béninoise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adresse</h3>
              <p className="text-blue-200">
                Route des Pêches, Akpakpa<br />
                Cotonou, Bénin<br />
                <span className="text-yellow-300">Afrique de l'Ouest</span>
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
              <p className="text-blue-200">
                +229 21 30 12 34<br />
                +229 97 12 34 56<br />
                <span className="text-yellow-300">24h/24</span>
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-blue-200">
                contact@hotel-nostress.bj<br />
                reservation@hotel-nostress.bj<br />
                <span className="text-yellow-300">Réponse rapide garantie</span>
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold"
              onClick={() => window.location.href = '/front-office/reservation'}
            >
              Réserver votre séjour
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Hôtel No-Stress</h3>
              <p className="text-gray-400">
                Votre havre de paix au cœur de Cotonou, 
                où tradition béninoise et modernité se rencontrent.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Hébergement</li>
                <li>Restaurant</li>
                <li>Événements</li>
                <li>Transport</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Informations</h4>
              <ul className="space-y-2 text-gray-400">
                <li>À propos</li>
                <li>Tarifs</li>
                <li>Réservation</li>
                <li>Contact</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Hôtel No-Stress Cotonou, Bénin. Tous droits réservés.</p>
            <p className="mt-2 text-sm">
              <span className="text-yellow-400">Akwaaba</span> - Bienvenue dans l'hospitalité béninoise
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
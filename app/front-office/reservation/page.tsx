'use client';

import { useState } from 'react';
import { FrontOfficeNav } from '@/components/layout/front-office-nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  Bed, 
  Star, 
  CheckCircle, 
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Heart,
  Award
} from 'lucide-react';

interface RoomType {
  id: string;
  name: string;
  price: number;
  currency: string;
  capacity: number;
  description: string;
  amenities: string[];
}

export default function ReservationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    specialRequests: ''
  });

  const roomTypes: RoomType[] = [
    {
      id: 'standard',
      name: 'Chambre Standard',
      price: 25000,
      currency: 'FCFA',
      capacity: 2,
      description: 'Chambre confortable avec décoration locale béninoise',
      amenities: ['WiFi', 'Climatisation', 'TV', 'Salle de bain privée']
    },
    {
      id: 'deluxe',
      name: 'Chambre Deluxe',
      price: 45000,
      currency: 'FCFA',
      capacity: 3,
      description: 'Chambre spacieuse avec balcon privé sur la lagune',
      amenities: ['WiFi', 'Climatisation', 'TV', 'Balcon', 'Mini-bar']
    },
    {
      id: 'suite',
      name: 'Suite Présidentielle',
      price: 85000,
      currency: 'FCFA',
      capacity: 4,
      description: 'Suite de luxe avec vue panoramique et service butler',
      amenities: ['WiFi', 'Climatisation', 'TV', 'Balcon', 'Mini-bar', 'Jacuzzi', 'Service butler']
    },
    {
      id: 'family',
      name: 'Suite Familiale',
      price: 65000,
      currency: 'FCFA',
      capacity: 6,
      description: 'Suite spacieuse idéale pour les familles',
      amenities: ['WiFi', 'Climatisation', 'TV', '2 chambres', 'Salon', 'Cuisine équipée']
    },
    {
      id: 'economic',
      name: 'Chambre Économique',
      price: 18000,
      currency: 'FCFA',
      capacity: 1,
      description: 'Chambre simple et confortable pour budget serré',
      amenities: ['WiFi', 'Ventilateur', 'TV', 'Salle de bain privée']
    },
    {
      id: 'business',
      name: 'Chambre Business',
      price: 35000,
      currency: 'FCFA',
      capacity: 2,
      description: 'Chambre spécialement conçue pour les voyageurs d\'affaires',
      amenities: ['WiFi', 'Climatisation', 'TV', 'Bureau', 'Coffre-fort']
    }
  ];

  const selectedRoom = roomTypes.find(room => room.id === formData.roomType);
  const nights = formData.checkIn && formData.checkOut ? 
    Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const totalAmount = selectedRoom ? selectedRoom.price * nights : 0;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Simulation de soumission
    alert('Réservation soumise avec succès ! Vous recevrez une confirmation par email.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <FrontOfficeNav currentPage="/front-office/reservation" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Réservez votre séjour
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-200 max-w-3xl mx-auto">
            Découvrez l'hospitalité béninoise dans un cadre moderne et authentique
          </p>
          <div className="flex items-center justify-center gap-4 text-blue-200">
            <MapPin className="h-5 w-5" />
            <span>Cotonou, Bénin - Au cœur de l'Afrique de l'Ouest</span>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`w-20 h-1 mx-2 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Étape {currentStep} sur 4
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Dates et nombre de voyageurs
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="checkIn">Date d'arrivée</Label>
                            <Input
                              id="checkIn"
                              type="date"
                              value={formData.checkIn}
                              onChange={(e) => handleInputChange('checkIn', e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div>
                            <Label htmlFor="checkOut">Date de départ</Label>
                            <Input
                              id="checkOut"
                              type="date"
                              value={formData.checkOut}
                              onChange={(e) => handleInputChange('checkOut', e.target.value)}
                              min={formData.checkIn || new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="guests">Nombre de voyageurs</Label>
                          <Select value={formData.guests.toString()} onValueChange={(value) => handleInputChange('guests', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6].map(num => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} personne{num > 1 ? 's' : ''}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Choisissez votre type de chambre
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {roomTypes.map((room) => (
                            <Card 
                              key={room.id} 
                              className={`cursor-pointer transition-all duration-200 ${
                                formData.roomType === room.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                              }`}
                              onClick={() => handleInputChange('roomType', room.id)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-semibold text-gray-900">{room.name}</h4>
                                  <Badge variant="secondary">{room.capacity} pers.</Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{room.description}</p>
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {room.amenities.slice(0, 3).map((amenity, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {amenity}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="text-lg font-bold text-blue-600">
                                  {room.price.toLocaleString()} {room.currency}/nuit
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Vos informations personnelles
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Nom</Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="+229 97 12 34 56"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="nationality">Nationalité</Label>
                          <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez votre nationalité" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beninoise">Béninoise</SelectItem>
                              <SelectItem value="senegalaise">Sénégalaise</SelectItem>
                              <SelectItem value="malienne">Malienne</SelectItem>
                              <SelectItem value="ivoirienne">Ivoirienne</SelectItem>
                              <SelectItem value="francaise">Française</SelectItem>
                              <SelectItem value="canadienne">Canadienne</SelectItem>
                              <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="specialRequests">Demandes spéciales (optionnel)</Label>
                          <Textarea
                            id="specialRequests"
                            value={formData.specialRequests}
                            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                            placeholder="Régime alimentaire, accessibilité, vue particulière..."
                            rows={3}
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Confirmation de votre réservation
                        </h3>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                          <div className="flex items-center gap-2 text-green-800">
                            <CheckCircle className="h-5 w-5" />
                            <span className="font-semibold">Réservation prête à être confirmée</span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">Type de chambre:</span>
                            <span className="font-semibold">{selectedRoom?.name}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">Dates:</span>
                            <span className="font-semibold">{formData.checkIn} - {formData.checkOut}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">Nombre de nuits:</span>
                            <span className="font-semibold">{nights}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">Voyageurs:</span>
                            <span className="font-semibold">{formData.guests} personne{formData.guests > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">Prix par nuit:</span>
                            <span className="font-semibold">{selectedRoom?.price.toLocaleString()} {selectedRoom?.currency}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">Total:</span>
                            <span className="text-xl font-bold text-blue-600">{totalAmount.toLocaleString()} FCFA</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                      >
                        Précédent
                      </Button>
                      
                      {currentStep < 4 ? (
                        <Button onClick={handleNext} disabled={
                          (currentStep === 1 && (!formData.checkIn || !formData.checkOut)) ||
                          (currentStep === 2 && !formData.roomType) ||
                          (currentStep === 3 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone))
                        }>
                          Suivant
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      ) : (
                        <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                          Confirmer la réservation
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Résumé
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedRoom && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Bed className="h-8 w-8 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{selectedRoom.name}</h4>
                            <p className="text-sm text-gray-600">{selectedRoom.capacity} voyageurs</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {selectedRoom.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {amenity}
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Prix par nuit:</span>
                            <span className="font-semibold">{selectedRoom.price.toLocaleString()} FCFA</span>
                          </div>
                          {nights > 0 && (
                            <>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Nombre de nuits:</span>
                                <span>{nights}</span>
                              </div>
                              <div className="flex justify-between items-center text-lg font-bold text-blue-600">
                                <span>Total:</span>
                                <span>{totalAmount.toLocaleString()} FCFA</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Services inclus</h4>
                      <ul className="space-y-1 text-sm text-blue-800">
                        <li>• WiFi haute vitesse</li>
                        <li>• Petit-déjeuner continental</li>
                        <li>• Parking sécurisé</li>
                        <li>• Service de conciergerie</li>
                        <li>• Accès à la piscine</li>
                      </ul>
                    </div>
                    
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-900 mb-2">Informations importantes</h4>
                      <ul className="space-y-1 text-sm text-orange-800">
                        <li>• Check-in: 14h00</li>
                        <li>• Check-out: 12h00</li>
                        <li>• Paiement à l'arrivée</li>
                        <li>• Annulation gratuite 24h avant</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Besoin d'aide pour votre réservation ?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Notre équipe est là pour vous accompagner avec l'hospitalité béninoise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-900"
              onClick={() => window.location.href = 'tel:+22921301234'}
            >
              <Phone className="h-4 w-4 mr-2" />
              +229 21 30 12 34
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-900"
              onClick={() => window.location.href = 'mailto:reservation@hotel-nostress.bj'}
            >
              <Mail className="h-4 w-4 mr-2" />
              reservation@hotel-nostress.bj
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 
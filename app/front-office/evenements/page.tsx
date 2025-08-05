'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FrontOfficeNav } from '@/components/layout/front-office-nav';
import { 
  Calendar as CalendarIcon, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Wifi, 
  Car, 
  Coffee, 
  Video,
  Mic,
  Projector,
  ArrowRight,
  Check,
  Clock,
  Award,
  Building,
  PartyPopper
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export default function EvenementsPage() {
  const [date, setDate] = useState<Date>();
  const [guests, setGuests] = useState('50');
  const [eventType, setEventType] = useState('conference');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const eventTypes = [
    {
      id: 'conference',
      name: 'Conférence',
      icon: Building,
      description: 'Salles équipées pour conférences et présentations',
      capacity: '20-200 personnes',
      price: 'À partir de 500€/jour'
    },
    {
      id: 'seminar',
      name: 'Séminaire',
      icon: Users,
      description: 'Espaces modulables pour formations et séminaires',
      capacity: '10-100 personnes',
      price: 'À partir de 300€/jour'
    },
    {
      id: 'wedding',
      name: 'Mariage',
      icon: PartyPopper,
      description: 'Salles élégantes pour cérémonies et réceptions',
      capacity: '50-300 personnes',
      price: 'À partir de 1000€/jour'
    },
    {
      id: 'meeting',
      name: 'Réunion',
      icon: Video,
      description: 'Salles de réunion intimes et professionnelles',
      capacity: '5-30 personnes',
      price: 'À partir de 150€/jour'
    }
  ];

  const amenities = [
    { icon: Wifi, name: 'WiFi haute vitesse', included: true },
    { icon: Projector, name: 'Projecteur', included: true },
    { icon: Mic, name: 'Système audio', included: true },
    { icon: Video, name: 'Visioconférence', included: true },
    { icon: Coffee, name: 'Service café', included: true },
    { icon: Car, name: 'Parking', included: true },
  ];

  const services = [
    { icon: Users, name: 'Service traiteur', description: 'Catering personnalisé pour vos événements' },
    { icon: Video, name: 'Technique audiovisuelle', description: 'Installation et support technique' },
    { icon: Building, name: 'Décoration', description: 'Service de décoration sur mesure' },
    { icon: Clock, name: 'Coordination', description: 'Coordination complète de votre événement' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <FrontOfficeNav currentPage="/front-office/evenements" />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Salles d'événements et
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}conférences
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Organisez vos événements dans nos espaces modernes et polyvalents. 
              De la petite réunion au grand événement, nous avons l'espace qu'il vous faut.
            </p>
            
            {/* Booking Widget */}
            <Card className="max-w-4xl mx-auto p-6 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Demande de devis</CardTitle>
                <CardDescription className="text-center">
                  Remplissez ce formulaire pour recevoir un devis personnalisé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="event-date">Date souhaitée</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="event-date"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-2",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP", { locale: fr }) : "Sélectionner une date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor="guests">Nombre de participants</Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">5-20 personnes</SelectItem>
                        <SelectItem value="50">20-50 personnes</SelectItem>
                        <SelectItem value="100">50-100 personnes</SelectItem>
                        <SelectItem value="200">100-200 personnes</SelectItem>
                        <SelectItem value="300">200+ personnes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="event-type">Type d'événement</Label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conference">Conférence</SelectItem>
                        <SelectItem value="seminar">Séminaire</SelectItem>
                        <SelectItem value="wedding">Mariage</SelectItem>
                        <SelectItem value="meeting">Réunion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Demander un devis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Types d'événements</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos différents espaces adaptés à tous types d'événements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((eventType) => {
              const Icon = eventType.icon;
              return (
                <Card key={eventType.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Icon className="h-16 w-16 text-blue-600" />
                    <Badge className="absolute top-4 right-4 bg-green-500">
                      Disponible
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2">{eventType.name}</h4>
                    <p className="text-gray-600 mb-4">{eventType.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{eventType.capacity}</span>
                      </div>
                      <div className="text-sm font-semibold text-blue-600">
                        {eventType.price}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      En savoir plus
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Services inclus</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tout est inclus pour le succès de votre événement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <amenity.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{amenity.name}</h4>
                <p className="text-gray-600 text-sm">Inclus dans tous nos forfaits</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Services optionnels</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Personnalisez votre événement avec nos services additionnels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="h-10 w-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <service.icon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">{service.name}</h4>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Contactez notre équipe événementielle</h3>
            <p className="text-lg opacity-90">
              Notre équipe spécialisée vous accompagne dans l'organisation de votre événement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h4 className="font-semibold mb-2">Téléphone</h4>
              <p className="opacity-90">+33 1 23 45 67 89</p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="opacity-90">evenements@hotel-nostress.fr</p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h4 className="font-semibold mb-2">Adresse</h4>
              <p className="opacity-90">123 Avenue de la Paix<br />75001 Paris, France</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold">Hôtel No-Stress</span>
              </div>
              <p className="text-gray-400">
                Votre partenaire pour des événements réussis. Espaces modernes et service personnalisé.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Événements</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Conférences</li>
                <li>Séminaires</li>
                <li>Mariages</li>
                <li>Réunions</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Traiteur</li>
                <li>Audiovisuel</li>
                <li>Décoration</li>
                <li>Coordination</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Devis</h4>
              <p className="text-gray-400 mb-4">
                Demandez un devis personnalisé pour votre événement
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Demander un devis
              </Button>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Hôtel No-Stress. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
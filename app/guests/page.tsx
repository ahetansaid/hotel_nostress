'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHotelStore } from '@/lib/store';
import { Plus, User, Mail, Phone, MapPin, Calendar, Star } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function GuestsPage() {
  const { guests, initializeData } = useHotelStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const getLoyaltyColor = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'bg-gray-800 text-white';
      case 'gold':
        return 'bg-yellow-500 text-white';
      case 'silver':
        return 'bg-gray-400 text-white';
      case 'bronze':
        return 'bg-orange-600 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getLoyaltyText = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'Platine';
      case 'gold':
        return 'Or';
      case 'silver':
        return 'Argent';
      case 'bronze':
        return 'Bronze';
      default:
        return tier;
    }
  };

  return (
    <div className="space-y-6">
      <Header 
        title="Gestion des clients" 
        subtitle={`${guests.length} clients enregistrés`}
        showBackButton={true}
      />
      
      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau client
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">Filtrer</Button>
            <Button variant="outline">Exporter</Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{guests.length}</div>
                  <div className="text-sm text-gray-600">Clients totaux</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Star className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {guests.filter(g => g.loyaltyTier === 'gold' || g.loyaltyTier === 'platinum').length}
                  </div>
                  <div className="text-sm text-gray-600">Clients VIP</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round(guests.reduce((sum, g) => sum + g.totalStays, 0) / guests.length)}
                  </div>
                  <div className="text-sm text-gray-600">Séjours moyens</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <User className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {guests.filter(g => new Date(g.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                  </div>
                  <div className="text-sm text-gray-600">Nouveaux (30j)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Guests List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Liste des clients</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {guests.map((guest) => (
              <Card key={guest.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {guest.firstName} {guest.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">{guest.nationality}</p>
                      </div>
                    </div>
                    
                    <Badge className={getLoyaltyColor(guest.loyaltyTier)}>
                      {getLoyaltyText(guest.loyaltyTier)}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{guest.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{guest.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="line-clamp-1">{guest.address}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Client depuis {formatDate(guest.createdAt)}</span>
                      </div>
                      <span className="font-medium text-primary">
                        {guest.totalStays} séjour{guest.totalStays > 1 ? 's' : ''}
                      </span>
                    </div>

                    {guest.preferences && guest.preferences.length > 0 && (
                      <div className="pt-2 border-t">
                        <p className="text-xs text-gray-500 mb-1">Préférences:</p>
                        <div className="flex flex-wrap gap-1">
                          {guest.preferences.map((pref, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {pref}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button size="sm" className="flex-1">
                      Voir profil
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Nouvelle réservation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
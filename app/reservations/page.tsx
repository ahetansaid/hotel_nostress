'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHotelStore } from '@/lib/store';
import { Plus, Calendar, Clock, User, Phone, Mail } from 'lucide-react';
import { formatDate, formatCurrency, getReservationStatusColor, getReservationStatusText, getPaymentStatusColor, getPaymentStatusText } from '@/lib/utils';

export default function ReservationsPage() {
  const { reservations, guests, rooms, initializeData } = useHotelStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const getGuestName = (guestId: string) => {
    const guest = guests.find(g => g.id === guestId);
    return guest ? `${guest.firstName} ${guest.lastName}` : 'Client inconnu';
  };

  const getRoomNumber = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    return room ? room.number : 'Chambre inconnue';
  };

  const getGuestDetails = (guestId: string) => {
    return guests.find(g => g.id === guestId);
  };

  return (
    <div className="space-y-6">
      <Header 
        title="Réservations" 
        subtitle={`${reservations.length} réservations au total`}
      />
      
      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle réservation
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
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Confirmées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {reservations.filter(r => r.status === 'confirmed').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                En attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {reservations.filter(r => r.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Terminées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {reservations.filter(r => r.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Annulées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {reservations.filter(r => r.status === 'cancelled').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Réservations récentes</h2>
          
          <div className="space-y-4">
            {reservations.map((reservation) => {
              const guest = getGuestDetails(reservation.guestId);
              return (
                <Card key={reservation.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {getGuestName(reservation.guestId)}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Chambre {getRoomNumber(reservation.roomId)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={getReservationStatusColor(reservation.status)}>
                              {getReservationStatusText(reservation.status)}
                            </Badge>
                            <Badge className={getPaymentStatusColor(reservation.paymentStatus)}>
                              {getPaymentStatusText(reservation.paymentStatus)}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>
                              {formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>{reservation.guests} personne(s)</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-green-600">
                              {formatCurrency(reservation.totalAmount)}
                            </span>
                          </div>
                        </div>

                        {guest && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <span>{guest.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <span>{guest.phone}</span>
                            </div>
                          </div>
                        )}

                        {reservation.specialRequests && (
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Demandes spéciales: </span>
                            <span className="text-gray-600">{reservation.specialRequests}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 lg:w-auto w-full">
                        <Button size="sm" className="w-full lg:w-auto">
                          Voir détails
                        </Button>
                        {reservation.status === 'pending' && (
                          <Button size="sm" variant="outline" className="w-full lg:w-auto">
                            Confirmer
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
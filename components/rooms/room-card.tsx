'use client';

import { Room } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, getRoomStatusColor, getRoomStatusText, getRoomTypeText, formatCurrency } from '@/lib/utils';
import { Bed, Users, Settings, Calendar, Clock, Star, Wifi, Car, Coffee } from 'lucide-react';
import { useHotelStore } from '@/lib/store';

interface RoomCardProps {
  room: Room;
  onClick?: () => void;
}

export function RoomCard({ room, onClick }: RoomCardProps) {
  const { updateRoom } = useHotelStore();

  const handleStatusChange = (newStatus: Room['status']) => {
    updateRoom(room.id, { status: newStatus });
  };

  const getStatusActions = () => {
    switch (room.status) {
      case 'occupied':
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('cleaning');
            }}
            className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
          >
            Check-out
          </Button>
        );
      case 'cleaning':
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('available');
            }}
            className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
          >
            Nettoyage terminé
          </Button>
        );
      case 'available':
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('occupied');
            }}
            className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
          >
            Check-in
          </Button>
        );
      case 'maintenance':
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('available');
            }}
            className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
          >
            Maintenance terminée
          </Button>
        );
      default:
        return null;
    }
  };

  const getStatusGradient = (status: Room['status']) => {
    switch (status) {
      case 'available':
        return 'from-green-500 to-emerald-600';
      case 'occupied':
        return 'from-red-500 to-pink-600';
      case 'cleaning':
        return 'from-yellow-500 to-orange-600';
      case 'maintenance':
        return 'from-purple-500 to-indigo-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-3 w-3" />;
      case 'parking':
        return <Car className="h-3 w-3" />;
      case 'café':
      case 'coffee':
        return <Coffee className="h-3 w-3" />;
      default:
        return <Star className="h-3 w-3" />;
    }
  };

  return (
    <Card 
      className={cn(
        'room-card cursor-pointer group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm',
        `room-${room.status}`
      )}
      onClick={onClick}
    >
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Chambre {room.number}
              </h3>
              <Badge variant="outline" className="text-xs bg-gray-50">
                Étage {room.floor}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 capitalize font-medium">
              {getRoomTypeText(room.type)}
            </p>
          </div>
          
          <Badge className={cn(
            'text-xs font-semibold px-3 py-1',
            `bg-gradient-to-r ${getStatusGradient(room.status)} text-white border-0`
          )}>
            {getRoomStatusText(room.status)}
          </Badge>
        </div>

        {/* Price and Capacity */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Prix/nuit</span>
            </div>
            <span className="text-lg font-bold text-blue-600">{formatCurrency(room.price)}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Capacité</span>
            </div>
            <span className="text-sm font-semibold text-purple-600">
              {room.type === 'single' ? '1' : room.type === 'suite' ? '4' : '2'} personne{room.type === 'single' ? '' : 's'}
            </span>
          </div>
        </div>

        {/* Guest Info */}
        {room.status === 'occupied' && room.currentGuest && (
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-semibold text-blue-900">{room.currentGuest}</span>
            </div>
            {room.checkOut && (
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <Calendar className="h-4 w-4" />
                <span>Départ: {new Date(room.checkOut).toLocaleDateString('fr-FR')}</span>
              </div>
            )}
          </div>
        )}

        {/* Status Info */}
        {room.status === 'cleaning' && (
          <div className="mb-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <span className="font-semibold text-yellow-800">Nettoyage en cours</span>
            </div>
          </div>
        )}

        {room.status === 'maintenance' && (
          <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings className="h-4 w-4 text-purple-600" />
              </div>
              <span className="font-semibold text-purple-800">En maintenance</span>
            </div>
          </div>
        )}

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Équipements</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {room.amenities.slice(0, 3).map((amenity, index) => (
              <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
            {room.amenities.length > 3 && (
              <div className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                +{room.amenities.length - 3}
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          {getStatusActions()}
        </div>
      </CardContent>
    </Card>
  );
}
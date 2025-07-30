'use client';

import { Room } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, getRoomStatusColor, getRoomStatusText, getRoomTypeText, formatCurrency } from '@/lib/utils';
import { Bed, Users, Settings, Calendar, Clock } from 'lucide-react';
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
            onClick={() => handleStatusChange('cleaning')}
          >
            Check-out
          </Button>
        );
      case 'cleaning':
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStatusChange('available')}
          >
            Nettoyage terminé
          </Button>
        );
      case 'available':
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStatusChange('occupied')}
          >
            Check-in
          </Button>
        );
      case 'maintenance':
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStatusChange('available')}
          >
            Maintenance terminée
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      className={cn(
        'room-card cursor-pointer',
        `room-${room.status}`
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Chambre {room.number}
              </h3>
              <Badge variant="outline" className="text-xs">
                Étage {room.floor}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 capitalize">
              {getRoomTypeText(room.type)}
            </p>
          </div>
          
          <Badge className={cn('text-xs', getRoomStatusColor(room.status))}>
            {getRoomStatusText(room.status)}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Bed className="h-4 w-4" />
            <span>{formatCurrency(room.price)}/nuit</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{room.type === 'single' ? '1' : room.type === 'suite' ? '4' : '2'} personnes max</span>
          </div>
        </div>

        {room.status === 'occupied' && room.currentGuest && (
          <div className="mb-4 p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">{room.currentGuest}</span>
            </div>
            {room.checkOut && (
              <div className="flex items-center gap-2 text-xs text-blue-700 mt-1">
                <Calendar className="h-3 w-3" />
                <span>Départ prévu: {new Date(room.checkOut).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        )}

        {room.status === 'cleaning' && (
          <div className="mb-4 p-2 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-yellow-800">
              <Clock className="h-4 w-4" />
              <span>Nettoyage en cours</span>
            </div>
          </div>
        )}

        {room.status === 'maintenance' && (
          <div className="mb-4 p-2 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-purple-800">
              <Settings className="h-4 w-4" />
              <span>En maintenance</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {room.amenities.slice(0, 2).join(', ')}
            {room.amenities.length > 2 && ` +${room.amenities.length - 2}`}
          </div>
          {getStatusActions()}
        </div>
      </CardContent>
    </Card>
  );
}
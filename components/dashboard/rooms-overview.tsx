'use client';

import { useHotelStore } from '@/lib/store';
import { RoomCard } from '@/components/rooms/room-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { Room } from '@/lib/types';

export function RoomsOverview() {
  const { rooms, setSelectedRoom } = useHotelStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [floorFilter, setFloorFilter] = useState<string>('all');

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.currentGuest?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    const matchesFloor = floorFilter === 'all' || room.floor.toString() === floorFilter;
    
    return matchesSearch && matchesStatus && matchesFloor;
  });

  const floors = [...new Set(rooms.map(room => room.floor))].sort();

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher par numéro de chambre ou nom du client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="available">Disponible</SelectItem>
            <SelectItem value="occupied">Occupée</SelectItem>
            <SelectItem value="cleaning">Nettoyage</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>

        <Select value={floorFilter} onValueChange={setFloorFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Étage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {floors.map((floor) => (
              <SelectItem key={floor} value={floor.toString()}>
                Étage {floor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-700">
            {rooms.filter(r => r.status === 'available').length}
          </div>
          <div className="text-sm text-green-600">Disponibles</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-700">
            {rooms.filter(r => r.status === 'occupied').length}
          </div>
          <div className="text-sm text-red-600">Occupées</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-700">
            {rooms.filter(r => r.status === 'cleaning').length}
          </div>
          <div className="text-sm text-yellow-600">Nettoyage</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-700">
            {rooms.filter(r => r.status === 'maintenance').length}
          </div>
          <div className="text-sm text-purple-600">Maintenance</div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onClick={() => setSelectedRoom(room)}
          />
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">Aucune chambre trouvée</div>
          <Button variant="outline" onClick={() => {
            setSearchTerm('');
            setStatusFilter('all');
            setFloorFilter('all');
          }}>
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  );
}
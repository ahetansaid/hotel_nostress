'use client';

import { useHotelStore } from '@/lib/store';
import { RoomCard } from '@/components/rooms/room-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Bed, Users, Clock, Wrench } from 'lucide-react';
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

  const statusStats = [
    {
      status: 'available',
      count: rooms.filter(r => r.status === 'available').length,
      label: 'Disponibles',
      icon: Bed,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700'
    },
    {
      status: 'occupied',
      count: rooms.filter(r => r.status === 'occupied').length,
      label: 'Occupées',
      icon: Users,
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-gradient-to-r from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700'
    },
    {
      status: 'cleaning',
      count: rooms.filter(r => r.status === 'cleaning').length,
      label: 'Nettoyage',
      icon: Clock,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-gradient-to-r from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700'
    },
    {
      status: 'maintenance',
      count: rooms.filter(r => r.status === 'maintenance').length,
      label: 'Maintenance',
      icon: Wrench,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-gradient-to-r from-purple-50 to-indigo-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher par numéro de chambre ou nom du client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-0 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] border-0 bg-gray-50 focus:bg-white">
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
            <SelectTrigger className="w-[120px] border-0 bg-gray-50 focus:bg-white">
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
      </div>

      {/* Enhanced Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statusStats.map((stat, index) => (
          <div 
            key={stat.status}
            className={`${stat.bgColor} p-6 rounded-2xl border ${stat.borderColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer`}
            onClick={() => setStatusFilter(stat.status)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${stat.bgColor} ${stat.textColor}`}>
                {((stat.count / rooms.length) * 100).toFixed(1)}%
              </div>
            </div>
            <div className={`text-3xl font-bold ${stat.textColor} mb-1`}>
              {stat.count}
            </div>
            <div className={`text-sm font-medium ${stat.textColor}`}>
              {stat.label}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-3">
              <div 
                className={`bg-gradient-to-r ${stat.color} h-1 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${(stat.count / rooms.length) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Rooms Grid */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Chambres de l'Hôtel No-Stress ({filteredRooms.length})
          </h3>
          <div className="text-sm text-gray-500">
            {filteredRooms.length === rooms.length ? 'Toutes les chambres' : 'Résultats filtrés'}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRooms.map((room, index) => (
            <div
              key={room.id}
              className="transform transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <RoomCard
                room={room}
                onClick={() => setSelectedRoom(room)}
              />
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Bed className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium text-gray-500 mb-2">Aucune chambre trouvée</p>
              <p className="text-sm text-gray-400">Essayez de modifier vos critères de recherche</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setFloorFilter('all');
              }}
              className="hover:bg-gray-50"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
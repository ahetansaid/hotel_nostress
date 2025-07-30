'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useHotelStore } from '@/lib/store';
import { RoomCard } from '@/components/rooms/room-card';
import { Plus, Filter, Download, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function RoomsPage() {
  const { rooms, initializeData } = useHotelStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.currentGuest?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const groupedRooms = filteredRooms.reduce((acc, room) => {
    if (!acc[room.status]) {
      acc[room.status] = [];
    }
    acc[room.status].push(room);
    return acc;
  }, {} as Record<string, typeof rooms>);

  return (
    <div className="space-y-6">
      <Header 
        title="Gestion des chambres" 
        subtitle={`${rooms.length} chambres au total`}
      />
      
      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle chambre
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
          
          <div className="flex gap-2">
            <div className="flex border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Rechercher par numéro ou client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="available">Disponible</SelectItem>
              <SelectItem value="occupied">Occupée</SelectItem>
              <SelectItem value="cleaning">Nettoyage</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rooms Content */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              Toutes ({filteredRooms.length})
            </TabsTrigger>
            <TabsTrigger value="available" className="text-green-600">
              Disponibles ({groupedRooms.available?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="occupied" className="text-red-600">
              Occupées ({groupedRooms.occupied?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="cleaning" className="text-yellow-600">
              Nettoyage ({groupedRooms.cleaning?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="text-purple-600">
              Maintenance ({groupedRooms.maintenance?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRooms.map((room) => (
                  <Card key={room.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold">Chambre {room.number}</h3>
                            <p className="text-sm text-gray-600">
                              {room.type} - Étage {room.floor}
                            </p>
                          </div>
                          <Badge variant={room.status === 'available' ? 'default' : 'secondary'}>
                            {room.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{room.price}€/nuit</p>
                          {room.currentGuest && (
                            <p className="text-sm text-gray-600">{room.currentGuest}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {['available', 'occupied', 'cleaning', 'maintenance'].map((status) => (
            <TabsContent key={status} value={status} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {(groupedRooms[status] || []).map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
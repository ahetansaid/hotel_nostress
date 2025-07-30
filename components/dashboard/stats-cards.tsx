'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHotelStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { 
  Bed, 
  Users, 
  TrendingUp, 
  Euro,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export function StatsCards() {
  const { stats } = useHotelStore();

  const cards = [
    {
      title: 'Taux d\'occupation',
      value: `${stats.occupancyRate.toFixed(1)}%`,
      description: `${stats.occupiedRooms}/${stats.totalRooms} chambres occupées`,
      icon: Bed,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Revenus totaux',
      value: formatCurrency(stats.totalRevenue),
      description: 'Revenus confirmés',
      icon: Euro,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Prix moyen par chambre',
      value: formatCurrency(stats.averageDailyRate),
      description: 'Prix moyen quotidien',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Arrivées aujourd\'hui',
      value: stats.todayCheckIns.toString(),
      description: 'Check-ins prévus',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Départs aujourd\'hui',
      value: stats.todayCheckOuts.toString(),
      description: 'Check-outs prévus',
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Réservations en attente',
      value: stats.pendingReservations.toString(),
      description: 'À confirmer',
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {card.value}
            </div>
            <p className="text-xs text-gray-500">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
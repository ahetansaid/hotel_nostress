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
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';

// Simple Revenue Chart Component
function RevenueChart() {
  const revenueData = [12000, 15000, 18000, 14000, 22000, 25000, 28000];
  const maxRevenue = Math.max(...revenueData);
  
  return (
    <div className="flex items-end justify-between h-16 gap-1">
      {revenueData.map((value, index) => (
        <div
          key={index}
          className="flex-1 bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-sm transition-all duration-300 hover:scale-110"
          style={{ height: `${(value / maxRevenue) * 100}%` }}
        />
      ))}
    </div>
  );
}

export function StatsCards() {
  const { stats } = useHotelStore();

  const cards = [
    {
      title: 'Taux d\'occupation',
      value: `${stats.occupancyRate.toFixed(1)}%`,
      description: `${stats.occupiedRooms}/${stats.totalRooms} chambres occupées`,
      icon: Bed,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      trend: '+5.2%',
      trendDirection: 'up' as const,
      gradient: 'from-blue-500 to-blue-600',
      chart: null,
    },
    {
      title: 'Revenus totaux',
      value: formatCurrency(stats.totalRevenue),
      description: 'Revenus confirmés ce mois',
      icon: Euro,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      trend: '+12.8%',
      trendDirection: 'up' as const,
      gradient: 'from-green-500 to-green-600',
      chart: <RevenueChart />,
    },
    {
      title: 'Prix moyen par chambre',
      value: formatCurrency(stats.averageDailyRate),
      description: 'Prix moyen quotidien',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      trend: '+3.1%',
      trendDirection: 'up' as const,
      gradient: 'from-purple-500 to-purple-600',
      chart: null,
    },
    {
      title: 'Arrivées aujourd\'hui',
      value: stats.todayCheckIns.toString(),
      description: 'Check-ins prévus',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      trend: '0%',
      trendDirection: 'neutral' as const,
      gradient: 'from-orange-500 to-orange-600',
      chart: null,
    },
    {
      title: 'Départs aujourd\'hui',
      value: stats.todayCheckOuts.toString(),
      description: 'Check-outs prévus',
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      trend: '-2.1%',
      trendDirection: 'down' as const,
      gradient: 'from-indigo-500 to-indigo-600',
      chart: null,
    },
    {
      title: 'Réservations en attente',
      value: stats.pendingReservations.toString(),
      description: 'À confirmer',
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      trend: '+8.5%',
      trendDirection: 'up' as const,
      gradient: 'from-yellow-500 to-yellow-600',
      chart: null,
    },
  ];

  const getTrendIcon = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case 'down':
        return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendColor = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Card 
          key={index} 
          className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
            <div className={`p-3 rounded-xl ${card.bgColor} group-hover:scale-110 transition-transform duration-300`}>
              <div className={`bg-gradient-to-r ${card.gradient} p-2 rounded-lg`}>
                <card.icon className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-gray-900">
                {card.value}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(card.trendDirection)}`}>
                {getTrendIcon(card.trendDirection)}
                <span>{card.trend}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              {card.description}
            </p>
            {card.chart && (
              <div className="mt-3">
                {card.chart}
              </div>
            )}
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className={`bg-gradient-to-r ${card.gradient} h-1 rounded-full transition-all duration-1000 ease-out`}
                style={{ 
                  width: card.title.includes('Taux') 
                    ? `${Math.min(stats.occupancyRate, 100)}%` 
                    : card.title.includes('Revenus') 
                    ? '85%' 
                    : card.title.includes('Prix') 
                    ? '72%' 
                    : card.title.includes('Arrivées') 
                    ? '60%' 
                    : card.title.includes('Départs') 
                    ? '45%' 
                    : '30%'
                }}
              ></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useHotelStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Bed, 
  Calendar 
} from 'lucide-react';

export default function ReportsPage() {
  const { stats, rooms, reservations, invoices, initializeData } = useHotelStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  // Sample data for charts
  const monthlyRevenue = [
    { month: 'Jan', revenue: 12500, occupancy: 75 },
    { month: 'Fév', revenue: 15200, occupancy: 82 },
    { month: 'Mar', revenue: 18900, occupancy: 88 },
    { month: 'Avr', revenue: 16800, occupancy: 79 },
    { month: 'Mai', revenue: 21200, occupancy: 92 },
    { month: 'Jun', revenue: 24500, occupancy: 95 },
  ];

  const roomTypeDistribution = [
    { name: 'Simple', value: rooms.filter(r => r.type === 'single').length, color: '#3B82F6' },
    { name: 'Double', value: rooms.filter(r => r.type === 'double').length, color: '#10B981' },
    { name: 'Suite', value: rooms.filter(r => r.type === 'suite').length, color: '#F59E0B' },
    { name: 'Deluxe', value: rooms.filter(r => r.type === 'deluxe').length, color: '#8B5CF6' },
  ];

  const occupancyTrend = [
    { day: 'Lun', rate: 85 },
    { day: 'Mar', rate: 92 },
    { day: 'Mer', rate: 78 },
    { day: 'Jeu', rate: 88 },
    { day: 'Ven', rate: 95 },
    { day: 'Sam', rate: 98 },
    { day: 'Dim', rate: 75 },
  ];

  return (
    <div className="space-y-6">
      <Header 
        title="Rapports et statistiques" 
        subtitle="Analyses détaillées de performance"
        showBackButton={true}
      />
      
      <div className="p-6 space-y-8">
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12.5% vs mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux d'occupation</CardTitle>
              <Bed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.occupancyRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +3.2% vs mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prix moyen</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.averageDailyRate)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="inline h-3 w-3 mr-1 text-red-500" />
                -1.8% vs mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Réservations totales</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reservations.length}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +8.1% vs mois dernier
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution du chiffre d'affaires</CardTitle>
              <CardDescription>Revenus mensuels (€)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Revenus']} />
                  <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Occupancy Rate */}
          <Card>
            <CardHeader>
              <CardTitle>Taux d'occupation hebdomadaire</CardTitle>
              <CardDescription>Pourcentage d'occupation (%)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={occupancyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Taux d\'occupation']} />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Room Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition des types de chambres</CardTitle>
              <CardDescription>Distribution par type de chambre</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roomTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roomTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Occupancy vs Revenue */}
          <Card>
            <CardHeader>
              <CardTitle>Corrélation occupation/revenus</CardTitle>
              <CardDescription>Taux d'occupation vs revenus mensuels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'occupancy' ? `${value}%` : formatCurrency(Number(value)),
                      name === 'occupancy' ? 'Occupation' : 'Revenus'
                    ]}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="occupancy" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance mensuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Meilleur jour:</span>
                <span className="font-medium">Samedi (98%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Jour le plus faible:</span>
                <span className="font-medium">Dimanche (75%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Durée moyenne séjour:</span>
                <span className="font-medium">2.8 nuits</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prévisions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenus prévus (mois):</span>
                <span className="font-medium text-green-600">{formatCurrency(26800)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Occupation prévue:</span>
                <span className="font-medium">89%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Croissance estimée:</span>
                <span className="font-medium text-green-600">+15.2%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommandations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-2 bg-blue-50 rounded text-blue-800">
                • Optimiser les prix en fin de semaine
              </div>
              <div className="p-2 bg-green-50 rounded text-green-800">
                • Promouvoir les séjours du dimanche
              </div>
              <div className="p-2 bg-yellow-50 rounded text-yellow-800">
                • Améliorer le taux de conversion
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
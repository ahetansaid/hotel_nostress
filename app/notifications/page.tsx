'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { QuickNav } from '@/components/layout/quick-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  XCircle, 
  Clock,
  Mail,
  Smartphone,
  Settings,
  Trash2,
  Check,
  Filter,
  Search,
  Calendar,
  User,
  CreditCard,
  Bed,
  Building
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'reservation' | 'payment' | 'room' | 'system' | 'event';
  priority: 'low' | 'medium' | 'high';
}

export default function NotificationsPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Données de démonstration
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: 'Nouvelle réservation confirmée',
      message: 'La réservation #12345 pour la chambre 201 a été confirmée pour le 15-17 décembre.',
      timestamp: 'Il y a 5 minutes',
      read: false,
      category: 'reservation',
      priority: 'high'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Paiement en attente',
      message: 'Le paiement pour la réservation #12340 est en attente depuis 24h.',
      timestamp: 'Il y a 1 heure',
      read: false,
      category: 'payment',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'error',
      title: 'Chambre indisponible',
      message: 'La chambre 305 est signalée comme indisponible pour maintenance.',
      timestamp: 'Il y a 2 heures',
      read: true,
      category: 'room',
      priority: 'high'
    },
    {
      id: '4',
      type: 'info',
      title: 'Mise à jour système',
      message: 'Une nouvelle version du système sera déployée ce soir à 23h.',
      timestamp: 'Il y a 3 heures',
      read: true,
      category: 'system',
      priority: 'low'
    },
    {
      id: '5',
      type: 'success',
      title: 'Événement confirmé',
      message: 'La salle de conférence A a été réservée pour le séminaire du 20 décembre.',
      timestamp: 'Il y a 4 heures',
      read: false,
      category: 'event',
      priority: 'medium'
    },
    {
      id: '6',
      type: 'warning',
      title: 'Stock faible',
      message: 'Les serviettes de toilette sont en stock faible (moins de 20 unités).',
      timestamp: 'Il y a 6 heures',
      read: true,
      category: 'system',
      priority: 'medium'
    },
    {
      id: '7',
      type: 'info',
      title: 'Nouveau client',
      message: 'M. Martin Dupont s\'est inscrit sur le site web.',
      timestamp: 'Il y a 8 heures',
      read: true,
      category: 'reservation',
      priority: 'low'
    },
    {
      id: '8',
      type: 'success',
      title: 'Paiement reçu',
      message: 'Le paiement de 450€ pour la réservation #12338 a été reçu.',
      timestamp: 'Il y a 12 heures',
      read: true,
      category: 'payment',
      priority: 'medium'
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const tabFilter = selectedTab === 'all' || 
                     (selectedTab === 'unread' && !notification.read) ||
                     (selectedTab === 'read' && notification.read);
    
    const categoryFilter = filterCategory === 'all' || notification.category === filterCategory;
    
    return tabFilter && categoryFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => n.read).length;

  return (
    <div className="flex-1 space-y-6 p-6">
      <Header 
        title="Notifications" 
        subtitle="Gérez vos notifications et alertes"
        showBackButton={true}
      />
      
      <Breadcrumb items={[
        { label: 'Notifications' }
      ]} />

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total</p>
                <p className="text-2xl font-bold text-blue-900">{notifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Non lues</p>
                <p className="text-2xl font-bold text-red-900">{unreadCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Lues</p>
                <p className="text-2xl font-bold text-green-900">{readCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Aujourd'hui</p>
                <p className="text-2xl font-bold text-purple-900">
                  {notifications.filter(n => n.timestamp.includes('minutes') || n.timestamp.includes('heure')).length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Check className="h-4 w-4 mr-2" />
            Tout marquer comme lu
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer les lues
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Préférences Email
          </Button>
          <Button variant="outline" size="sm">
            <Smartphone className="h-4 w-4 mr-2" />
            Notifications Push
          </Button>
        </div>
      </div>

      {/* Filtres et Onglets */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-2">
              Toutes ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex items-center gap-2">
              Non lues ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="read" className="flex items-center gap-2">
              Lues ({readCount})
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les catégories</option>
              <option value="reservation">Réservations</option>
              <option value="payment">Paiements</option>
              <option value="room">Chambres</option>
              <option value="event">Événements</option>
              <option value="system">Système</option>
            </select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <NotificationsList notifications={filteredNotifications} />
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <NotificationsList notifications={filteredNotifications} />
        </TabsContent>

        <TabsContent value="read" className="space-y-4">
          <NotificationsList notifications={filteredNotifications} />
        </TabsContent>
      </Tabs>

      <QuickNav currentPage="/notifications" />
    </div>
  );
}

function NotificationsList({ notifications }: { notifications: Notification[] }) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'reservation':
        return <Calendar className="h-4 w-4" />;
      case 'payment':
        return <CreditCard className="h-4 w-4" />;
      case 'room':
        return <Bed className="h-4 w-4" />;
      case 'event':
        return <Building className="h-4 w-4" />;
      case 'system':
        return <Settings className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (notifications.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune notification</h3>
          <p className="text-gray-600">Vous n'avez aucune notification pour le moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card 
          key={notification.id} 
          className={`transition-all duration-200 hover:shadow-md ${
            !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {getTypeIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Nouveau
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(notification.category)}
                        <span className="capitalize">{notification.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {notification.timestamp}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getPriorityColor(notification.priority)}`}
                    >
                      {notification.priority === 'high' ? 'Haute' : 
                       notification.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </Badge>
                    
                    <div className="flex gap-1">
                      {!notification.read && (
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 
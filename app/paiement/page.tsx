'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { QuickNav } from '@/components/layout/quick-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Download,
  Eye,
  Printer,
  Send,
  Filter,
  Search,
  Calendar,
  User,
  Receipt,
  Banknote,
  Wallet,
  TrendingUp,
  TrendingDown,
  RefreshCw
} from 'lucide-react';

interface Payment {
  id: string;
  reservationId: string;
  guestName: string;
  amount: number;
  currency: string;
  method: 'card' | 'cash' | 'transfer' | 'check';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  date: string;
  dueDate: string;
  description: string;
  transactionId?: string;
}

export default function PaiementPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Données de démonstration
  const payments: Payment[] = [
    {
      id: 'PAY001',
      reservationId: 'RES12345',
      guestName: 'Marie Dupont',
      amount: 450,
      currency: 'EUR',
      method: 'card',
      status: 'completed',
      date: '2024-12-10',
      dueDate: '2024-12-10',
      description: 'Séjour 2 nuits - Chambre 201',
      transactionId: 'TXN123456789'
    },
    {
      id: 'PAY002',
      reservationId: 'RES12346',
      guestName: 'Jean Martin',
      amount: 320,
      currency: 'EUR',
      method: 'transfer',
      status: 'pending',
      date: '2024-12-11',
      dueDate: '2024-12-12',
      description: 'Séjour 1 nuit - Chambre 305'
    },
    {
      id: 'PAY003',
      reservationId: 'RES12347',
      guestName: 'Sophie Bernard',
      amount: 680,
      currency: 'EUR',
      method: 'cash',
      status: 'completed',
      date: '2024-12-11',
      dueDate: '2024-12-11',
      description: 'Séjour 3 nuits - Suite 401'
    },
    {
      id: 'PAY004',
      reservationId: 'RES12348',
      guestName: 'Pierre Durand',
      amount: 280,
      currency: 'EUR',
      method: 'card',
      status: 'failed',
      date: '2024-12-12',
      dueDate: '2024-12-12',
      description: 'Séjour 1 nuit - Chambre 102'
    },
    {
      id: 'PAY005',
      reservationId: 'RES12349',
      guestName: 'Anne Moreau',
      amount: 520,
      currency: 'EUR',
      method: 'check',
      status: 'pending',
      date: '2024-12-12',
      dueDate: '2024-12-15',
      description: 'Séjour 2 nuits - Chambre 203'
    },
    {
      id: 'PAY006',
      reservationId: 'RES12350',
      guestName: 'Lucas Petit',
      amount: 380,
      currency: 'EUR',
      method: 'card',
      status: 'refunded',
      date: '2024-12-09',
      dueDate: '2024-12-09',
      description: 'Séjour 2 nuits - Chambre 104 (remboursé)',
      transactionId: 'TXN123456790'
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const tabFilter = selectedTab === 'all' || payment.status === selectedTab;
    const searchFilter = payment.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        payment.reservationId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return tabFilter && searchFilter;
  });

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedAmount = payments.filter(p => p.status === 'completed').reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, payment) => sum + payment.amount, 0);
  const failedAmount = payments.filter(p => p.status === 'failed').reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="flex-1 space-y-6 p-6">
      <Header 
        title="Gestion des Paiements" 
        subtitle="Suivez et gérez tous les paiements de l'hôtel"
        showBackButton={true}
      />
      
      <Breadcrumb items={[
        { label: 'Paiements' }
      ]} />

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Reçu</p>
                <p className="text-2xl font-bold text-green-900">{completedAmount}€</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">En Attente</p>
                <p className="text-2xl font-bold text-yellow-900">{pendingAmount}€</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Échoués</p>
                <p className="text-2xl font-bold text-red-900">{failedAmount}€</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Général</p>
                <p className="text-2xl font-bold text-blue-900">{totalAmount}€</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-2">
          <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
            <Download className="h-4 w-4 mr-2" />
            Exporter les rapports
          </Button>
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Send className="h-4 w-4 mr-2" />
            Envoyer rappel
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
        </div>
      </div>

      {/* Recherche et Filtres */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher par client, ID réservation ou ID paiement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Méthode de paiement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les méthodes</SelectItem>
              <SelectItem value="card">Carte bancaire</SelectItem>
              <SelectItem value="cash">Espèces</SelectItem>
              <SelectItem value="transfer">Virement</SelectItem>
              <SelectItem value="check">Chèque</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les périodes</SelectItem>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Onglets et Liste */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-2">
            Tous ({payments.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Payés ({payments.filter(p => p.status === 'completed').length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            En attente ({payments.filter(p => p.status === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="failed" className="flex items-center gap-2">
            Échoués ({payments.filter(p => p.status === 'failed').length})
          </TabsTrigger>
          <TabsTrigger value="refunded" className="flex items-center gap-2">
            Remboursés ({payments.filter(p => p.status === 'refunded').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <PaymentsList payments={filteredPayments} />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <PaymentsList payments={filteredPayments} />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <PaymentsList payments={filteredPayments} />
        </TabsContent>

        <TabsContent value="failed" className="space-y-4">
          <PaymentsList payments={filteredPayments} />
        </TabsContent>

        <TabsContent value="refunded" className="space-y-4">
          <PaymentsList payments={filteredPayments} />
        </TabsContent>
      </Tabs>

      <QuickNav currentPage="/paiement" />
    </div>
  );
}

function PaymentsList({ payments }: { payments: Payment[] }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'refunded':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default:
        return <CreditCard className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'refunded':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className="h-3 w-3" />;
      case 'cash':
        return <Banknote className="h-3 w-3" />;
      case 'transfer':
        return <Wallet className="h-3 w-3" />;
      case 'check':
        return <Receipt className="h-3 w-3" />;
      default:
        return <CreditCard className="h-3 w-3" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Complété';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échoué';
      case 'refunded':
        return 'Remboursé';
      default:
        return 'Inconnu';
    }
  };

  const getMethodText = (method: string) => {
    switch (method) {
      case 'card':
        return 'Carte';
      case 'cash':
        return 'Espèces';
      case 'transfer':
        return 'Virement';
      case 'check':
        return 'Chèque';
      default:
        return 'Inconnu';
    }
  };

  if (payments.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun paiement trouvé</h3>
          <p className="text-gray-600">Aucun paiement ne correspond à vos critères de recherche.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {payments.map((payment) => (
        <Card key={payment.id} className="transition-all duration-200 hover:shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(payment.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{payment.id}</h4>
                    <Badge variant="outline" className={getStatusColor(payment.status)}>
                      {getStatusText(payment.status)}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1">{payment.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {payment.guestName}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(payment.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center gap-1">
                      {getMethodIcon(payment.method)}
                      {getMethodText(payment.method)}
                    </div>
                    {payment.transactionId && (
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-3 w-3" />
                        {payment.transactionId}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{payment.amount}€</p>
                  <p className="text-xs text-gray-500">Échéance: {new Date(payment.dueDate).toLocaleDateString('fr-FR')}</p>
                </div>
                
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 
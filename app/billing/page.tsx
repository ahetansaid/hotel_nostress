'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHotelStore } from '@/lib/store';
import { Plus, Download, Eye, Send, Euro, Calendar, User } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';

export default function BillingPage() {
  const { invoices, guests, reservations, initializeData } = useHotelStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const getGuestName = (guestId: string) => {
    const guest = guests.find(g => g.id === guestId);
    return guest ? `${guest.firstName} ${guest.lastName}` : 'Client inconnu';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'sent':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'draft':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'overdue':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'cancelled':
        return 'bg-gray-50 text-gray-500 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Payée';
      case 'sent':
        return 'Envoyée';
      case 'draft':
        return 'Brouillon';
      case 'overdue':
        return 'En retard';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);
  const pendingAmount = invoices.filter(i => i.status === 'sent').reduce((sum, i) => sum + i.total, 0);
  const overdueAmount = invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="space-y-6">
      <Header 
        title="Facturation" 
        subtitle={`${invoices.length} factures au total`}
      />
      
      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle facture
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Euro className="h-4 w-4" />
                Revenus totaux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalRevenue)}
              </div>
              <p className="text-xs text-gray-500">Factures payées</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                En attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(pendingAmount)}
              </div>
              <p className="text-xs text-gray-500">Factures envoyées</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                En retard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(overdueAmount)}
              </div>
              <p className="text-xs text-gray-500">Factures impayées</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total factures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {invoices.length}
              </div>
              <p className="text-xs text-gray-500">Toutes périodes</p>
            </CardContent>
          </Card>
        </div>

        {/* Invoices List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Factures récentes</h2>
          
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            Facture #{invoice.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {getGuestName(invoice.guestId)}
                          </p>
                        </div>
                        <Badge className={getStatusColor(invoice.status)}>
                          {getStatusText(invoice.status)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Émise le {formatDate(invoice.issueDate)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Échéance: {formatDate(invoice.dueDate)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Euro className="h-4 w-4 text-gray-400" />
                          <span className="font-semibold text-lg">
                            {formatCurrency(invoice.total)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Articles:</h4>
                        {invoice.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm text-gray-600 pl-4">
                            <span>{item.description} (x{item.quantity})</span>
                            <span>{formatCurrency(item.total)}</span>
                          </div>
                        ))}
                      </div>

                      {invoice.status === 'paid' && invoice.paidDate && (
                        <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                          Payée le {formatDate(invoice.paidDate)} 
                          {invoice.paymentMethod && ` par ${invoice.paymentMethod}`}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 lg:w-auto w-full">
                      <Button size="sm" variant="outline" className="w-full lg:w-auto">
                        <Eye className="h-4 w-4 mr-2" />
                        Voir
                      </Button>
                      <Button size="sm" variant="outline" className="w-full lg:w-auto">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      {invoice.status === 'draft' && (
                        <Button size="sm" className="w-full lg:w-auto">
                          <Send className="h-4 w-4 mr-2" />
                          Envoyer
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, 
  Bed, 
  Calendar, 
  Users, 
  Receipt, 
  BarChart3,
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Settings,
  Bell,
  FileText
} from 'lucide-react';

interface QuickNavProps {
  currentPage: string;
}

export function QuickNav({ currentPage }: QuickNavProps) {
  const navigationItems = [
    { 
      title: 'Dashboard', 
      href: '/dashboard', 
      icon: Home, 
      description: 'Vue d\'ensemble' 
    },
    { 
      title: 'Chambres', 
      href: '/rooms', 
      icon: Bed, 
      description: 'Gestion des chambres' 
    },
    { 
      title: 'Réservations', 
      href: '/reservations', 
      icon: Calendar, 
      description: 'Gestion des réservations' 
    },
    { 
      title: 'Clients', 
      href: '/guests', 
      icon: Users, 
      description: 'Gestion des clients' 
    },
    { 
      title: 'Facturation', 
      href: '/billing', 
      icon: Receipt, 
      description: 'Facturation et paiements' 
    },
    { 
      title: 'Paiements', 
      href: '/paiement', 
      icon: CreditCard, 
      description: 'Gestion des paiements' 
    },
    { 
      title: 'Rapports', 
      href: '/reports', 
      icon: BarChart3, 
      description: 'Analytics et statistiques' 
    },
    { 
      title: 'Paramètres', 
      href: '/parametres', 
      icon: Settings, 
      description: 'Paramètres du système' 
    },
    { 
      title: 'Notifications', 
      href: '/notifications', 
      icon: Bell, 
      description: 'Gestion des notifications' 
    },
    { 
      title: 'Documents', 
      href: '/documents', 
      icon: FileText, 
      description: 'Gestion des documents' 
    },
  ];

  const currentIndex = navigationItems.findIndex(item => item.href === currentPage);
  const prevItem = currentIndex > 0 ? navigationItems[currentIndex - 1] : null;
  const nextItem = currentIndex < navigationItems.length - 1 ? navigationItems[currentIndex + 1] : null;

  return (
    <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Navigation rapide</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          {/* Previous */}
          {prevItem && (
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => window.location.href = prevItem.href}
            >
              <ArrowLeft className="h-4 w-4" />
              <div className="text-left">
                <div className="text-sm font-medium">{prevItem.title}</div>
                <div className="text-xs text-gray-500">{prevItem.description}</div>
              </div>
            </Button>
          )}
          
          {/* Current */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-blue-300 shadow-sm">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              {React.createElement(navigationItems[currentIndex]?.icon || Home, { className: "h-4 w-4 text-white" })}
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{navigationItems[currentIndex]?.title}</div>
              <div className="text-xs text-gray-500">{navigationItems[currentIndex]?.description}</div>
            </div>
          </div>
          
          {/* Next */}
          {nextItem && (
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => window.location.href = nextItem.href}
            >
              <div className="text-right">
                <div className="text-sm font-medium">{nextItem.title}</div>
                <div className="text-xs text-gray-500">{nextItem.description}</div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* All Pages */}
        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.href;
              
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                      : "hover:bg-blue-50"
                  }`}
                  onClick={() => window.location.href = item.href}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{item.title}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
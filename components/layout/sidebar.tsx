'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  Bed,
  Users,
  Calendar,
  Receipt,
  BarChart3,
  Settings,
  Bell,
  FileText,
  CreditCard,
  LogOut,
  Hotel,
  TrendingUp,
  Shield,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: Home, badge: null },
  { name: 'Chambres', href: '/rooms', icon: Bed, badge: '12' },
  { name: 'Réservations', href: '/reservations', icon: Calendar, badge: '5' },
  { name: 'Clients', href: '/guests', icon: Users, badge: null },
  { name: 'Facturation', href: '/billing', icon: Receipt, badge: '3' },
  { name: 'Rapports', href: '/reports', icon: BarChart3, badge: null },
];

const secondaryNavigation = [
  { name: 'Notifications', href: '/notifications', icon: Bell, badge: '3' },
  { name: 'Documents', href: '/documents', icon: FileText, badge: null },
  { name: 'Paiements', href: '/paiement', icon: CreditCard, badge: '2' },
  { name: 'Paramètres', href: '/parametres', icon: Settings, badge: null },
  { name: 'Site Public', href: '/front-office', icon: Globe, badge: null },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white/90 backdrop-blur-sm border-r border-gray-200/50">
      {/* Enhanced Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-gray-200/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
          <Hotel className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Hôtel No-Stresse
          </span>
          <span className="text-xs text-gray-500 font-medium">Gestion hôtelière</span>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'sidebar-item group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <div className={cn(
                  'flex items-center justify-center w-5 h-5 transition-all duration-200',
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                )}>
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <Badge 
                    variant={isActive ? "secondary" : "outline"} 
                    className={cn(
                      'ml-auto text-xs font-medium',
                      isActive ? 'bg-white/20 text-white border-white/30' : 'bg-gray-100 text-gray-600'
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
                {isActive && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-l-full"></div>
                )}
              </Link>
            );
          })}
        </div>

        <Separator className="my-6 bg-gray-200/50" />

        <div className="space-y-1">
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'sidebar-item group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <div className={cn(
                  'flex items-center justify-center w-5 h-5 transition-all duration-200',
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                )}>
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <Badge 
                    variant={isActive ? "secondary" : "outline"} 
                    className={cn(
                      'ml-auto text-xs font-medium',
                      isActive ? 'bg-white/20 text-white border-white/30' : 'bg-gray-100 text-gray-600'
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
                {isActive && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-l-full"></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">Aujourd'hui</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Arrivées</span>
              <span className="font-semibold text-green-600">8</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Départs</span>
              <span className="font-semibold text-red-600">5</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Taux d'occupation</span>
              <span className="font-semibold text-blue-600">85%</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced User section */}
      <div className="p-4 border-t border-gray-200/50">
        <div className="flex items-center gap-3 mb-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Admin</p>
            <p className="text-xs text-gray-500 truncate">admin@hotel-nostresse.fr</p>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-600 font-medium">Admin</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start hover:bg-red-50 hover:text-red-600 transition-colors"
          onClick={() => {
            // Optionnel : Ajouter une confirmation
            if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
              window.location.href = '/front-office';
            }
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}
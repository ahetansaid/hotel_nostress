'use client';

import { Button } from '@/components/ui/button';
import {
  Home,
  Bed,
  Calendar,
  Users,
  Receipt,
  BarChart3,
  ChevronUp,
  ChevronDown,
  CreditCard,
  Settings,
  Bell,
  FileText
} from 'lucide-react';
import { useState } from 'react';

export function FloatingNav() {
  const [isExpanded, setIsExpanded] = useState(false);

  const navigationItems = [
    { 
      title: 'Dashboard', 
      href: '/dashboard', 
      icon: Home, 
      color: 'bg-blue-500 hover:bg-blue-600' 
    },
    { 
      title: 'Chambres', 
      href: '/rooms', 
      icon: Bed, 
      color: 'bg-green-500 hover:bg-green-600' 
    },
    { 
      title: 'Réservations', 
      href: '/reservations', 
      icon: Calendar, 
      color: 'bg-purple-500 hover:bg-purple-600' 
    },
    { 
      title: 'Clients', 
      href: '/guests', 
      icon: Users, 
      color: 'bg-orange-500 hover:bg-orange-600' 
    },
    { 
      title: 'Facturation', 
      href: '/billing', 
      icon: Receipt, 
      color: 'bg-red-500 hover:bg-red-600' 
    },
    { 
      title: 'Paiements', 
      href: '/paiement', 
      icon: CreditCard, 
      color: 'bg-emerald-500 hover:bg-emerald-600' 
    },
    { 
      title: 'Rapports', 
      href: '/reports', 
      icon: BarChart3, 
      color: 'bg-indigo-500 hover:bg-indigo-600' 
    },
    { 
      title: 'Paramètres', 
      href: '/parametres', 
      icon: Settings, 
      color: 'bg-gray-500 hover:bg-gray-600' 
    },
    { 
      title: 'Notifications', 
      href: '/notifications', 
      icon: Bell, 
      color: 'bg-pink-500 hover:bg-pink-600' 
    },
    { 
      title: 'Documents', 
      href: '/documents', 
      icon: FileText, 
      color: 'bg-teal-500 hover:bg-teal-600' 
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Navigation Items */}
      {isExpanded && (
        <div className="mb-4 space-y-2">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.href}
                size="sm"
                className={`${item.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInUp 0.3s ease-out forwards'
                }}
                onClick={() => window.location.href = item.href}
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.title}
              </Button>
            );
          })}
        </div>
      )}
      
      {/* Toggle Button */}
      <Button
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <ChevronUp className="h-5 w-5" />
        )}
      </Button>
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Bed,
  Users,
  Award,
  Building,
  Shield
} from 'lucide-react';

interface FrontOfficeNavProps {
  currentPage?: string;
}

export function FrontOfficeNav({ currentPage }: FrontOfficeNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '/front-office', icon: Star },
    { name: 'Chambres', href: '/front-office/chambres', icon: Bed },
    { name: 'Événements', href: '/front-office/evenements', icon: Building },
    { name: 'Réservation', href: '/front-office/reservation', icon: Calendar },
    { name: 'Services', href: '/front-office#services', icon: Award },
    { name: 'Contact', href: '/front-office#contact', icon: Phone },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hôtel No-Stress
              </h1>
              <p className="text-sm text-gray-600">Votre séjour, notre passion</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.href;
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </a>
              );
            })}
            
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Réserver maintenant
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-300 hover:bg-gray-50"
              onClick={() => window.location.href = '/login'}
            >
              <Shield className="h-4 w-4 mr-2" />
              Espace Staff
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2 pt-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.href;
                
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </a>
                );
              })}
              
              <div className="pt-2 space-y-2">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Réserver maintenant
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 hover:bg-gray-50"
                  onClick={() => window.location.href = '/login'}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Espace Staff
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 
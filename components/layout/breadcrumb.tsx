'use client';

import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-4">
      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-2 hover:bg-gray-100"
        onClick={() => window.location.href = '/dashboard'}
      >
        <Home className="h-3 w-3" />
      </Button>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          {item.href ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              onClick={() => window.location.href = item.href!}
            >
              {item.label}
            </Button>
          ) : (
            <span className="px-2 text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
} 
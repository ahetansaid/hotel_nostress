'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RoomsOverview } from '@/components/dashboard/rooms-overview';
import { useHotelStore } from '@/lib/store';

export default function DashboardPage() {
  const { initializeData, calculateStats } = useHotelStore();

  useEffect(() => {
    initializeData();
    calculateStats();
  }, [initializeData, calculateStats]);

  return (
    <div className="space-y-6">
      <Header 
        title="Tableau de bord - Hôtel No-Stress" 
        subtitle="Gestion hôtelière au cœur de Cotonou, Bénin" 
      />
      
      <div className="p-6 space-y-8">
        <StatsCards />
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">État des chambres</h2>
          <RoomsOverview />
        </div>
      </div>
    </div>
  );
}
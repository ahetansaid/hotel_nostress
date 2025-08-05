import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, formatStr: string = 'dd/MM/yyyy'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr, { locale: fr });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
  }).format(amount);
}

export function formatPhone(phone: string): string {
  // Format Beninese phone numbers
  return phone.replace(/(\+229\s?)(\d{2})(\d{2})(\d{2})(\d{2})/, '$1$2 $3 $4 $5');
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getRoomStatusColor(status: string): string {
  switch (status) {
    case 'available':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'occupied':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'cleaning':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'maintenance':
      return 'text-purple-600 bg-purple-50 border-purple-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

export function getRoomStatusText(status: string): string {
  switch (status) {
    case 'available':
      return 'Disponible';
    case 'occupied':
      return 'Occupée';
    case 'cleaning':
      return 'Nettoyage';
    case 'maintenance':
      return 'Maintenance';
    default:
      return 'Inconnu';
  }
}

export function getRoomTypeText(type: string): string {
  switch (type) {
    case 'single':
      return 'Simple';
    case 'double':
      return 'Double';
    case 'suite':
      return 'Suite';
    case 'deluxe':
      return 'Deluxe';
    default:
      return type;
  }
}

export function getReservationStatusColor(status: string): string {
  switch (status) {
    case 'confirmed':
      return 'text-green-600 bg-green-50';
    case 'pending':
      return 'text-yellow-600 bg-yellow-50';
    case 'cancelled':
      return 'text-red-600 bg-red-50';
    case 'completed':
      return 'text-blue-600 bg-blue-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getReservationStatusText(status: string): string {
  switch (status) {
    case 'confirmed':
      return 'Confirmée';
    case 'pending':
      return 'En attente';
    case 'cancelled':
      return 'Annulée';
    case 'completed':
      return 'Terminée';
    default:
      return status;
  }
}

export function getPaymentStatusColor(status: string): string {
  switch (status) {
    case 'paid':
      return 'text-green-600 bg-green-50';
    case 'partial':
      return 'text-yellow-600 bg-yellow-50';
    case 'pending':
      return 'text-orange-600 bg-orange-50';
    case 'refunded':
      return 'text-blue-600 bg-blue-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getPaymentStatusText(status: string): string {
  switch (status) {
    case 'paid':
      return 'Payé';
    case 'partial':
      return 'Partiel';
    case 'pending':
      return 'En attente';
    case 'refunded':
      return 'Remboursé';
    default:
      return status;
  }
}
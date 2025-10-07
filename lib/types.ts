export interface Room {
  id: string;
  number: string;
  type: 'single' | 'double' | 'suite' | 'deluxe' | 'standard' | 'family' | 'economic' | 'business';
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance' | 'reserved';
  floor: number;
  price: number;
  amenities: string[];
  lastCleaned?: Date | string;
  currentGuest?: string;
  checkIn?: Date;
  checkOut?: Date;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  idDocument: string;
  birthDate: Date;
  address: string;
  preferences?: string[];
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalStays: number;
  createdAt: Date;
}

export interface Reservation {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  numberOfGuests: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  totalAmount: number;
  currency: string;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded';
  specialRequests?: string;
  createdAt: string;
  source: 'website' | 'phone' | 'walk-in' | 'travel-agency';
}

export interface Invoice {
  id: string;
  reservationId: string;
  guestId: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  paidAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: Date;
  dueDate: Date;
  paidDate?: Date;
  paymentMethod?: 'cash' | 'card' | 'transfer' | 'check';
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: 'room' | 'service' | 'food' | 'tax' | 'other';
}

export interface HotelStats {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  cleaningRooms: number;
  maintenanceRooms: number;
  occupancyRate: number;
  averageDailyRate: number;
  totalRevenue: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  pendingReservations: number;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  emailTemplate: string;
  smsTemplate: string;
  whatsappTemplate: string;
}

export type RoomStatus = Room['status'];
export type ReservationStatus = Reservation['status'];
export type PaymentStatus = Reservation['paymentStatus'];
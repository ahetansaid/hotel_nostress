// Données de démonstration adaptées au contexte béninois

export interface Room {
  id: string;
  number: string;
  type: 'standard' | 'deluxe' | 'suite' | 'family' | 'economic' | 'business';
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  price: number;
  currency: string;
  capacity: number;
  size: string;
  floor: number;
  amenities: string[];
  lastCleaned?: string;
  notes?: string;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  idNumber: string;
  checkIn: string;
  checkOut: string;
  roomId: string;
  status: 'checked-in' | 'checked-out' | 'reserved' | 'no-show';
  specialRequests?: string;
  totalAmount: number;
  currency: string;
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
  paymentStatus: 'paid' | 'pending' | 'partial' | 'refunded';
  specialRequests?: string;
  createdAt: string;
  source: 'website' | 'phone' | 'walk-in' | 'travel-agency';
}

export interface Payment {
  id: string;
  reservationId: string;
  guestName: string;
  amount: number;
  currency: string;
  method: 'card' | 'cash' | 'transfer' | 'check' | 'mobile-money';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  date: string;
  dueDate: string;
  description: string;
  transactionId?: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'reservation' | 'payment' | 'room' | 'system' | 'event';
  priority: 'low' | 'medium' | 'high';
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'spreadsheet' | 'document' | 'contract';
  category: 'legal' | 'financial' | 'operational' | 'marketing' | 'hr';
  status: 'active' | 'archived' | 'draft' | 'expired';
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  lastModified: string;
  tags: string[];
}

// Données des chambres
export const rooms: Room[] = [
  {
    id: '1',
    number: '101',
    type: 'standard',
    status: 'available',
    price: 25000,
    currency: 'FCFA',
    capacity: 2,
    size: '25m²',
    floor: 1,
    amenities: ['WiFi', 'Climatisation', 'TV', 'Salle de bain privée'],
    lastCleaned: '2024-12-13T08:00:00Z'
  },
  {
    id: '2',
    number: '102',
    type: 'standard',
    status: 'occupied',
    price: 25000,
    currency: 'FCFA',
    capacity: 2,
    size: '25m²',
    floor: 1,
    amenities: ['WiFi', 'Climatisation', 'TV', 'Salle de bain privée'],
    lastCleaned: '2024-12-12T08:00:00Z'
  },
  {
    id: '3',
    number: '201',
    type: 'deluxe',
    status: 'available',
    price: 45000,
    currency: 'FCFA',
    capacity: 3,
    size: '35m²',
    floor: 2,
    amenities: ['WiFi', 'Climatisation', 'TV', 'Balcon', 'Mini-bar'],
    lastCleaned: '2024-12-13T09:00:00Z'
  },
  {
    id: '4',
    number: '202',
    type: 'deluxe',
    status: 'reserved',
    price: 45000,
    currency: 'FCFA',
    capacity: 3,
    size: '35m²',
    floor: 2,
    amenities: ['WiFi', 'Climatisation', 'TV', 'Balcon', 'Mini-bar'],
    lastCleaned: '2024-12-12T09:00:00Z'
  },
  {
    id: '5',
    number: '301',
    type: 'suite',
    status: 'available',
    price: 85000,
    currency: 'FCFA',
    capacity: 4,
    size: '60m²',
    floor: 3,
    amenities: ['WiFi', 'Climatisation', 'TV', 'Balcon', 'Mini-bar', 'Jacuzzi', 'Service butler'],
    lastCleaned: '2024-12-13T10:00:00Z'
  },
  {
    id: '6',
    number: '302',
    type: 'suite',
    status: 'maintenance',
    price: 85000,
    currency: 'FCFA',
    capacity: 4,
    size: '60m²',
    floor: 3,
    amenities: ['WiFi', 'Climatisation', 'TV', 'Balcon', 'Mini-bar', 'Jacuzzi', 'Service butler'],
    notes: 'Rénovation en cours - Réouverture prévue le 20/12'
  },
  {
    id: '7',
    number: '401',
    type: 'family',
    status: 'available',
    price: 65000,
    currency: 'FCFA',
    capacity: 6,
    size: '50m²',
    floor: 4,
    amenities: ['WiFi', 'Climatisation', 'TV', '2 chambres', 'Salon', 'Cuisine équipée'],
    lastCleaned: '2024-12-13T08:30:00Z'
  },
  {
    id: '8',
    number: '501',
    type: 'economic',
    status: 'available',
    price: 18000,
    currency: 'FCFA',
    capacity: 1,
    size: '20m²',
    floor: 5,
    amenities: ['WiFi', 'Ventilateur', 'TV', 'Salle de bain privée'],
    lastCleaned: '2024-12-13T07:00:00Z'
  },
  {
    id: '9',
    number: '601',
    type: 'business',
    status: 'occupied',
    price: 35000,
    currency: 'FCFA',
    capacity: 2,
    size: '30m²',
    floor: 6,
    amenities: ['WiFi', 'Climatisation', 'TV', 'Bureau', 'Coffre-fort'],
    lastCleaned: '2024-12-12T08:00:00Z'
  },
  {
    id: '10',
    number: '602',
    type: 'business',
    status: 'available',
    price: 35000,
    currency: 'FCFA',
    capacity: 2,
    size: '30m²',
    floor: 6,
    amenities: ['WiFi', 'Climatisation', 'TV', 'Bureau', 'Coffre-fort'],
    lastCleaned: '2024-12-13T08:00:00Z'
  },
  {
    id: '11',
    number: '701',
    type: 'standard',
    status: 'available',
    price: 25000,
    currency: 'FCFA',
    capacity: 2,
    size: '25m²',
    floor: 7,
    amenities: ['WiFi', 'Climatisation', 'TV', 'Salle de bain privée'],
    lastCleaned: '2024-12-13T08:00:00Z'
  },
  {
    id: '12',
    number: '702',
    type: 'standard',
    status: 'available',
    price: 25000,
    currency: 'FCFA',
    capacity: 2,
    size: '25m²',
    floor: 7,
    amenities: ['WiFi', 'Climatisation', 'TV', 'Salle de bain privée'],
    lastCleaned: '2024-12-13T08:00:00Z'
  }
];

// Données des clients
export const guests: Guest[] = [
  {
    id: '1',
    firstName: 'Kossi',
    lastName: 'Adjo',
    email: 'kossi.adjo@email.bj',
    phone: '+229 97 12 34 56',
    nationality: 'Béninoise',
    idNumber: 'BJ123456789',
    checkIn: '2024-12-10',
    checkOut: '2024-12-15',
    roomId: '2',
    status: 'checked-in',
    specialRequests: 'Régime végétarien',
    totalAmount: 125000,
    currency: 'FCFA'
  },
  {
    id: '2',
    firstName: 'Fatou',
    lastName: 'Diallo',
    email: 'fatou.diallo@email.sn',
    phone: '+221 77 123 45 67',
    nationality: 'Sénégalaise',
    idNumber: 'SN987654321',
    checkIn: '2024-12-11',
    checkOut: '2024-12-14',
    roomId: '4',
    status: 'reserved',
    totalAmount: 135000,
    currency: 'FCFA'
  },
  {
    id: '3',
    firstName: 'Jean',
    lastName: 'Martin',
    email: 'jean.martin@email.fr',
    phone: '+33 6 12 34 56 78',
    nationality: 'Française',
    idNumber: 'FR123456789',
    checkIn: '2024-12-12',
    checkOut: '2024-12-16',
    roomId: '9',
    status: 'checked-in',
    specialRequests: 'Chambre avec vue sur la lagune',
    totalAmount: 140000,
    currency: 'FCFA'
  },
  {
    id: '4',
    firstName: 'Aminata',
    lastName: 'Traoré',
    email: 'aminata.traore@email.ml',
    phone: '+223 76 12 34 56',
    nationality: 'Malienne',
    idNumber: 'ML123456789',
    checkIn: '2024-12-08',
    checkOut: '2024-12-12',
    roomId: '6',
    status: 'checked-out',
    totalAmount: 340000,
    currency: 'FCFA'
  },
  {
    id: '5',
    firstName: 'Pierre',
    lastName: 'Dupont',
    email: 'pierre.dupont@email.ca',
    phone: '+1 514 123 4567',
    nationality: 'Canadienne',
    idNumber: 'CA123456789',
    checkIn: '2024-12-15',
    checkOut: '2024-12-20',
    roomId: '5',
    status: 'reserved',
    specialRequests: 'Service de conciergerie',
    totalAmount: 425000,
    currency: 'FCFA'
  }
];

// Données des réservations
export const reservations: Reservation[] = [
  {
    id: 'RES001',
    guestName: 'Kossi Adjo',
    guestEmail: 'kossi.adjo@email.bj',
    guestPhone: '+229 97 12 34 56',
    checkIn: '2024-12-10',
    checkOut: '2024-12-15',
    roomType: 'Standard',
    numberOfGuests: 2,
    status: 'confirmed',
    totalAmount: 125000,
    currency: 'FCFA',
    paymentStatus: 'paid',
    specialRequests: 'Régime végétarien',
    createdAt: '2024-12-05T10:30:00Z',
    source: 'website'
  },
  {
    id: 'RES002',
    guestName: 'Fatou Diallo',
    guestEmail: 'fatou.diallo@email.sn',
    guestPhone: '+221 77 123 45 67',
    checkIn: '2024-12-11',
    checkOut: '2024-12-14',
    roomType: 'Deluxe',
    numberOfGuests: 3,
    status: 'confirmed',
    totalAmount: 135000,
    currency: 'FCFA',
    paymentStatus: 'pending',
    createdAt: '2024-12-06T14:20:00Z',
    source: 'phone'
  },
  {
    id: 'RES003',
    guestName: 'Jean Martin',
    guestEmail: 'jean.martin@email.fr',
    guestPhone: '+33 6 12 34 56 78',
    checkIn: '2024-12-12',
    checkOut: '2024-12-16',
    roomType: 'Business',
    numberOfGuests: 1,
    status: 'confirmed',
    totalAmount: 140000,
    currency: 'FCFA',
    paymentStatus: 'paid',
    specialRequests: 'Chambre avec vue sur la lagune',
    createdAt: '2024-12-07T09:15:00Z',
    source: 'travel-agency'
  },
  {
    id: 'RES004',
    guestName: 'Aminata Traoré',
    guestEmail: 'aminata.traore@email.ml',
    guestPhone: '+223 76 12 34 56',
    checkIn: '2024-12-08',
    checkOut: '2024-12-12',
    roomType: 'Suite',
    numberOfGuests: 2,
    status: 'completed',
    totalAmount: 340000,
    currency: 'FCFA',
    paymentStatus: 'paid',
    createdAt: '2024-12-03T16:45:00Z',
    source: 'website'
  },
  {
    id: 'RES005',
    guestName: 'Pierre Dupont',
    guestEmail: 'pierre.dupont@email.ca',
    guestPhone: '+1 514 123 4567',
    checkIn: '2024-12-15',
    checkOut: '2024-12-20',
    roomType: 'Suite',
    numberOfGuests: 2,
    status: 'confirmed',
    totalAmount: 425000,
    currency: 'FCFA',
    paymentStatus: 'partial',
    specialRequests: 'Service de conciergerie',
    createdAt: '2024-12-08T11:30:00Z',
    source: 'travel-agency'
  }
];

// Données des paiements
export const payments: Payment[] = [
  {
    id: 'PAY001',
    reservationId: 'RES001',
    guestName: 'Kossi Adjo',
    amount: 125000,
    currency: 'FCFA',
    method: 'card',
    status: 'completed',
    date: '2024-12-10',
    dueDate: '2024-12-10',
    description: 'Séjour 5 nuits - Chambre 102',
    transactionId: 'TXN123456789'
  },
  {
    id: 'PAY002',
    reservationId: 'RES002',
    guestName: 'Fatou Diallo',
    amount: 135000,
    currency: 'FCFA',
    method: 'transfer',
    status: 'pending',
    date: '2024-12-11',
    dueDate: '2024-12-12',
    description: 'Séjour 3 nuits - Chambre 202'
  },
  {
    id: 'PAY003',
    reservationId: 'RES003',
    guestName: 'Jean Martin',
    amount: 140000,
    currency: 'FCFA',
    method: 'cash',
    status: 'completed',
    date: '2024-12-12',
    dueDate: '2024-12-12',
    description: 'Séjour 4 nuits - Chambre 601'
  },
  {
    id: 'PAY004',
    reservationId: 'RES004',
    guestName: 'Aminata Traoré',
    amount: 340000,
    currency: 'FCFA',
    method: 'card',
    status: 'completed',
    date: '2024-12-08',
    dueDate: '2024-12-08',
    description: 'Séjour 4 nuits - Suite 302',
    transactionId: 'TXN123456790'
  },
  {
    id: 'PAY005',
    reservationId: 'RES005',
    guestName: 'Pierre Dupont',
    amount: 212500,
    currency: 'FCFA',
    method: 'check',
    status: 'pending',
    date: '2024-12-15',
    dueDate: '2024-12-15',
    description: 'Acompte 50% - Suite 301'
  }
];

// Données des notifications
export const notifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Nouvelle réservation confirmée',
    message: 'La réservation #RES002 pour la chambre 202 a été confirmée pour le 11-14 décembre.',
    timestamp: 'Il y a 5 minutes',
    read: false,
    category: 'reservation',
    priority: 'high'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Paiement en attente',
    message: 'Le paiement pour la réservation #RES002 est en attente depuis 24h.',
    timestamp: 'Il y a 1 heure',
    read: false,
    category: 'payment',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'error',
    title: 'Chambre indisponible',
    message: 'La chambre 302 est signalée comme indisponible pour maintenance.',
    timestamp: 'Il y a 2 heures',
    read: true,
    category: 'room',
    priority: 'high'
  },
  {
    id: '4',
    type: 'info',
    title: 'Mise à jour système',
    message: 'Une nouvelle version du système sera déployée ce soir à 23h.',
    timestamp: 'Il y a 3 heures',
    read: true,
    category: 'system',
    priority: 'low'
  },
  {
    id: '5',
    type: 'success',
    title: 'Événement confirmé',
    message: 'La salle de conférence A a été réservée pour le séminaire du 20 décembre.',
    timestamp: 'Il y a 4 heures',
    read: false,
    category: 'event',
    priority: 'medium'
  }
];

// Données des documents
export const documents: Document[] = [
  {
    id: '1',
    name: 'Contrat de location - Hôtel No-Stress',
    type: 'pdf',
    category: 'legal',
    status: 'active',
    size: '2.5 MB',
    uploadedBy: 'Admin',
    uploadedAt: '2024-01-15T10:30:00Z',
    lastModified: '2024-12-01T14:20:00Z',
    tags: ['contrat', 'location', 'légal']
  },
  {
    id: '2',
    name: 'Rapport financier - Novembre 2024',
    type: 'spreadsheet',
    category: 'financial',
    status: 'active',
    size: '1.8 MB',
    uploadedBy: 'Comptable',
    uploadedAt: '2024-12-01T09:15:00Z',
    lastModified: '2024-12-01T09:15:00Z',
    tags: ['finances', 'rapport', 'novembre']
  },
  {
    id: '3',
    name: 'Photos de l\'hôtel - Cotonou',
    type: 'image',
    category: 'marketing',
    status: 'active',
    size: '15.2 MB',
    uploadedBy: 'Marketing',
    uploadedAt: '2024-11-28T16:45:00Z',
    lastModified: '2024-11-28T16:45:00Z',
    tags: ['photos', 'marketing', 'cotonou']
  },
  {
    id: '4',
    name: 'Procédures de sécurité - COVID-19',
    type: 'document',
    category: 'operational',
    status: 'active',
    size: '850 KB',
    uploadedBy: 'Manager',
    uploadedAt: '2024-11-25T11:20:00Z',
    lastModified: '2024-12-05T10:30:00Z',
    tags: ['sécurité', 'covid', 'procédures']
  },
  {
    id: '5',
    name: 'Contrat employé - Kossi Adjo',
    type: 'pdf',
    category: 'hr',
    status: 'active',
    size: '1.2 MB',
    uploadedBy: 'RH',
    uploadedAt: '2024-11-20T14:10:00Z',
    lastModified: '2024-11-20T14:10:00Z',
    tags: ['contrat', 'employé', 'rh']
  }
];

// Statistiques du dashboard
export const dashboardStats = {
  totalRooms: 12,
  availableRooms: 8,
  occupiedRooms: 3,
  maintenanceRooms: 1,
  totalGuests: 5,
  checkInsToday: 2,
  checkOutsToday: 1,
  occupancyRate: 75,
  totalRevenue: 765000,
  currency: 'FCFA',
  pendingPayments: 347500,
  currencyPending: 'FCFA'
};
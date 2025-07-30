import { create } from 'zustand';
import { Room, Guest, Reservation, Invoice, HotelStats } from './types';
import { mockRooms, mockGuests, mockReservations, mockInvoices } from './mock-data';

interface HotelStore {
  // Data
  rooms: Room[];
  guests: Guest[];
  reservations: Reservation[];
  invoices: Invoice[];
  stats: HotelStats;
  
  // UI State
  selectedRoom: Room | null;
  selectedGuest: Guest | null;
  selectedReservation: Reservation | null;
  isLoading: boolean;
  
  // Actions
  setRooms: (rooms: Room[]) => void;
  updateRoom: (roomId: string, updates: Partial<Room>) => void;
  setGuests: (guests: Guest[]) => void;
  addGuest: (guest: Guest) => void;
  updateGuest: (guestId: string, updates: Partial<Guest>) => void;
  setReservations: (reservations: Reservation[]) => void;
  addReservation: (reservation: Reservation) => void;
  updateReservation: (reservationId: string, updates: Partial<Reservation>) => void;
  setInvoices: (invoices: Invoice[]) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoiceId: string, updates: Partial<Invoice>) => void;
  setStats: (stats: HotelStats) => void;
  calculateStats: () => void;
  setSelectedRoom: (room: Room | null) => void;
  setSelectedGuest: (guest: Guest | null) => void;
  setSelectedReservation: (reservation: Reservation | null) => void;
  setLoading: (loading: boolean) => void;
  initializeData: () => void;
}

export const useHotelStore = create<HotelStore>((set, get) => ({
  // Initial state
  rooms: [],
  guests: [],
  reservations: [],
  invoices: [],
  stats: {
    totalRooms: 0,
    occupiedRooms: 0,
    availableRooms: 0,
    cleaningRooms: 0,
    maintenanceRooms: 0,
    occupancyRate: 0,
    averageDailyRate: 0,
    totalRevenue: 0,
    todayCheckIns: 0,
    todayCheckOuts: 0,
    pendingReservations: 0,
  },
  selectedRoom: null,
  selectedGuest: null,
  selectedReservation: null,
  isLoading: false,

  // Actions
  setRooms: (rooms) => set({ rooms }),
  
  updateRoom: (roomId, updates) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === roomId ? { ...room, ...updates } : room
      ),
    })),

  setGuests: (guests) => set({ guests }),
  
  addGuest: (guest) =>
    set((state) => ({ guests: [...state.guests, guest] })),
  
  updateGuest: (guestId, updates) =>
    set((state) => ({
      guests: state.guests.map((guest) =>
        guest.id === guestId ? { ...guest, ...updates } : guest
      ),
    })),

  setReservations: (reservations) => set({ reservations }),
  
  addReservation: (reservation) =>
    set((state) => ({ reservations: [...state.reservations, reservation] })),
  
  updateReservation: (reservationId, updates) =>
    set((state) => ({
      reservations: state.reservations.map((reservation) =>
        reservation.id === reservationId ? { ...reservation, ...updates } : reservation
      ),
    })),

  setInvoices: (invoices) => set({ invoices }),
  
  addInvoice: (invoice) =>
    set((state) => ({ invoices: [...state.invoices, invoice] })),
  
  updateInvoice: (invoiceId, updates) =>
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === invoiceId ? { ...invoice, ...updates } : invoice
      ),
    })),

  setStats: (stats) => set({ stats }),
  
  calculateStats: () => {
    const { rooms, reservations, invoices } = get();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
    const availableRooms = rooms.filter(r => r.status === 'available').length;
    const cleaningRooms = rooms.filter(r => r.status === 'cleaning').length;
    const maintenanceRooms = rooms.filter(r => r.status === 'maintenance').length;
    const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;
    
    const todayCheckIns = reservations.filter(r => {
      const checkIn = new Date(r.checkIn);
      checkIn.setHours(0, 0, 0, 0);
      return checkIn.getTime() === today.getTime();
    }).length;
    
    const todayCheckOuts = reservations.filter(r => {
      const checkOut = new Date(r.checkOut);
      checkOut.setHours(0, 0, 0, 0);
      return checkOut.getTime() === today.getTime();
    }).length;
    
    const pendingReservations = reservations.filter(r => r.status === 'pending').length;
    
    const totalRevenue = invoices
      .filter(i => i.status === 'paid')
      .reduce((sum, i) => sum + i.total, 0);
    
    const averageDailyRate = occupiedRooms > 0 
      ? rooms.filter(r => r.status === 'occupied').reduce((sum, r) => sum + r.price, 0) / occupiedRooms
      : 0;

    set({
      stats: {
        totalRooms,
        occupiedRooms,
        availableRooms,
        cleaningRooms,
        maintenanceRooms,
        occupancyRate,
        averageDailyRate,
        totalRevenue,
        todayCheckIns,
        todayCheckOuts,
        pendingReservations,
      },
    });
  },

  setSelectedRoom: (room) => set({ selectedRoom: room }),
  setSelectedGuest: (guest) => set({ selectedGuest: guest }),
  setSelectedReservation: (reservation) => set({ selectedReservation: reservation }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  initializeData: () => {
    set({
      rooms: mockRooms,
      guests: mockGuests,
      reservations: mockReservations,
      invoices: mockInvoices,
    });
    get().calculateStats();
  },
}));
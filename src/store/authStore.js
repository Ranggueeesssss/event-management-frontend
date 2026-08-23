import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null, // e.g., { email: 'organizer@test.com', role: 'organizer' }
  isAuthenticated: false,
  login: (email, role) => set({ user: { email, role }, isAuthenticated: true }),
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  }
}));

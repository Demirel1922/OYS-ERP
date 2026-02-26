import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  allowedModules: string[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

// Demo kullanıcılar
const DEMO_USERS: Record<string, { user: User; password: string }> = {
  admin: {
    user: {
      id: '1',
      username: 'admin',
      email: 'admin@oys.com',
      fullName: 'Admin User',
      isAdmin: true,
      modules: ['all'],
    },
    password: 'admin123',
  },
  user: {
    user: {
      id: '2',
      username: 'user',
      email: 'user@oys.com',
      fullName: 'Normal User',
      isAdmin: false,
      modules: ['1', '2', '3', '3a', '4'],
    },
    password: 'user123',
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      allowedModules: [],
      isAuthenticated: false,
      isAdmin: false,

      login: async (username: string, password: string) => {
        const demoUser = DEMO_USERS[username];
        if (demoUser && demoUser.password === password) {
          set({
            user: demoUser.user,
            token: 'demo-token-' + Date.now(),
            allowedModules: demoUser.user.modules,
            isAuthenticated: true,
            isAdmin: demoUser.user.isAdmin,
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          user: null,
          token: null,
          allowedModules: [],
          isAuthenticated: false,
          isAdmin: false,
        });
      },

      checkAuth: () => {
        const { token } = get();
        if (!token) {
          set({
            user: null,
            isAuthenticated: false,
            isAdmin: false,
            allowedModules: [],
          });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

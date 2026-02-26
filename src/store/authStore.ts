import { create } from 'zustand';
import type { AuthState, Session } from '@/types';
import {
  initializeStorage,
  findUserByCredentials,
  saveSession,
  clearSession,
  getSession,
  isAdmin,
} from '@/utils/storage';

// Initialize storage on load
initializeStorage();

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isAuthenticated: false,
  isAdmin: false,

  login: (username: string, password: string) => {
    const user = findUserByCredentials(username, password);

    if (!user) {
      // Check if user exists but is inactive
      const users = JSON.parse(localStorage.getItem('erp_users') || '[]');
      const inactiveUser = users.find(
        (u: { username: string; password: string; active: boolean }) =>
          u.username === username && u.password === password && !u.active
      );

      if (inactiveUser) {
        return {
          success: false,
          message: 'Hesabınız pasif durumda. Lütfen yöneticinizle iletişime geçin.',
        };
      }

      return {
        success: false,
        message: 'Kullanıcı adı veya şifre hatalı.',
      };
    }

    const session: Session = {
      userId: user.id,
      username: user.username,
      name: user.name,
      allowedModules: user.allowedModules,
    };

    saveSession(session);

    set({
      session,
      isAuthenticated: true,
      isAdmin: isAdmin(user.allowedModules),
    });

    return { success: true, message: 'Giriş başarılı.' };
  },

  logout: () => {
    clearSession();
    set({
      session: null,
      isAuthenticated: false,
      isAdmin: false,
    });
  },

  checkAuth: () => {
    const session = getSession();
    if (session) {
      set({
        session,
        isAuthenticated: true,
        isAdmin: isAdmin(session.allowedModules),
      });
      return true;
    }
    return false;
  },
}));

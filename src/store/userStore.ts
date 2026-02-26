import { create } from 'zustand';
import type { UserState, User } from '@/types';
import { getUsers, saveUsers } from '@/utils/storage';

export const useUserStore = create<UserState>((set, get) => ({
  users: [],

  loadUsers: () => {
    const users = getUsers();
    set({ users });
  },

  addUser: (userData: Omit<User, 'id'>) => {
    const users = getUsers();
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    set({ users: updatedUsers });
  },

  updateUser: (id: string, updates: Partial<User>) => {
    const users = getUsers();
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, ...updates } : user
    );
    saveUsers(updatedUsers);
    set({ users: updatedUsers });
  },

  deleteUser: (id: string) => {
    const users = getUsers();
    const updatedUsers = users.filter((user) => user.id !== id);
    saveUsers(updatedUsers);
    set({ users: updatedUsers });
  },

  getUserById: (id: string) => {
    return get().users.find((user) => user.id === id);
  },

  toggleUserActive: (id: string) => {
    const users = getUsers();
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, active: !user.active } : user
    );
    saveUsers(updatedUsers);
    set({ users: updatedUsers });
  },
}));

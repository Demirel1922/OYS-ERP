import type { User, Session } from '@/types';

const STORAGE_KEYS = {
  USERS: 'erp_users',
  SESSION: 'erp_session',
} as const;

// Seed users for initial setup
const SEED_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'Admin1234!',
    name: 'Sistem Yöneticisi',
    active: true,
    allowedModules: ['all'],
  },
  {
    id: '2',
    username: 'planlama',
    password: 'Test1234!',
    name: 'Planlama Sorumlusu',
    active: true,
    allowedModules: ['6'],
  },
  {
    id: '3',
    username: 'kalite',
    password: 'Test1234!',
    name: 'Kalite Kontrol Sorumlusu',
    active: true,
    allowedModules: ['11'],
  },
  {
    id: '4',
    username: 'iplikci',
    password: '1234',
    name: 'İplik Depo Sorumlusu',
    active: true,
    allowedModules: ['3a'],
  },
  {
    id: '5',
    username: 'aksesuar',
    password: '1234',
    name: 'Aksesuar Depo Sorumlusu',
    active: true,
    allowedModules: ['3b'],
  },
  {
    id: '6',
    username: 'depomudur',
    password: '1234',
    name: 'Depo Müdürü',
    active: true,
    allowedModules: ['3', '3a', '3b'],
  },
];

// Initialize storage with seed users if empty
export function initializeStorage(): void {
  const existingUsers = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!existingUsers) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
  }
}

// Get all users
export function getUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
}

// Save all users
export function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

// Get current session
export function getSession(): Session | null {
  const data = localStorage.getItem(STORAGE_KEYS.SESSION);
  return data ? JSON.parse(data) : null;
}

// Save session
export function saveSession(session: Session): void {
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
}

// Clear session (logout)
export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

// Find user by username and password
export function findUserByCredentials(username: string, password: string): User | undefined {
  const users = getUsers();
  return users.find(
    (u) => u.username === username && u.password === password && u.active
  );
}

// Check if user has module access
export function hasModuleAccess(allowedModules: string[], moduleId: string): boolean {
  if (allowedModules.includes('all')) return true;
  return allowedModules.includes(moduleId);
}

// Check if user is admin
export function isAdmin(allowedModules: string[]): boolean {
  return allowedModules.includes('all');
}

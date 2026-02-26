// User model
export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  active: boolean;
  allowedModules: string[];
}

// Session model (stored in localStorage during login)
export interface Session {
  userId: string;
  username: string;
  name: string;
  allowedModules: string[];
}

// Module definition
export interface Module {
  id: string;
  title: string;
  description: string;
  route: string;
  parent: string | null;
  hasChildren: boolean;
  adminOnly: boolean;
}

// Auth state
export interface AuthState {
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  checkAuth: () => boolean;
}

// User state
export interface UserState {
  users: User[];
  loadUsers: () => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;
  toggleUserActive: (id: string) => void;
}

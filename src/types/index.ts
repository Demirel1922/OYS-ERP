export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  isAdmin: boolean;
  modules: string[];
}

export interface Session {
  user: User;
  token: string;
  allowedModules: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  route: string;
  parent: string | null;
  hasChildren: boolean;
  adminOnly: boolean;
}

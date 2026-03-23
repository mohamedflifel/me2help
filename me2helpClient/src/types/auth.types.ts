export interface AuthFormData {
  fullname?: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  fullname: string;
  email: string;
  token: string;
}

// export interface AuthContextType {
//   user: AuthUser | null;
//   isAuthenticated: boolean;
//   login: (user: AuthUser) => void;
//   logout: () => void;
// }
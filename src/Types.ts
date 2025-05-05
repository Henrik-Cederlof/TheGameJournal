
export type Game = {
  id: string;
  name: string;
  cover?: {
    url: string;
  };
  summary?: string;
  platforms?: string[];
  completionist: boolean,
  personalNote: string,
  addedDate: Date,
  _id: string,
};

export type UserData = {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
};

export type UserContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
};

export type ToastMessageType = {
  title: string;
  message: string;
  type: "success" | "error" | "info";
  onClose?: () => void;
};
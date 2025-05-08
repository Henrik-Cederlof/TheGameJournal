import { ObjectId } from "mongoose";

export type Game = {
  gameId: string;
  name: string;
  rating?: number;
  cover?: {
    url: string;
  };
  summary?: string;
  platforms?: string[];
  isCompleted: boolean,
  IsActive: boolean,
  personalNote: string,
  addedDate: Date,
  _id: ObjectId;
};

export type UserData = {
  id: string;
  firstname: string;
  lastname: string;
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

export type UserContextType = {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
  isLoggedIn: boolean;
};

export type ToastMessageType = {
  title: string;
  message: string;
  type: "success" | "error" | "info";
  onClose?: () => void;
};
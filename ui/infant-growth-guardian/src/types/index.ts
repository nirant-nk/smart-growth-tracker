
export interface User {
  _id: string;
  role: 'asha' | 'anm' | 'parent';
  name: string;
  phone: string;
  village?: string;
  children: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Child {
  _id: string;
  name: string;
  dob: string;
  gender: 'male' | 'female';
  village?: string;
  uniqueId: string;
  parent?: string;
  createdBy: string;
  growthRecords: string[] | GrowthRecord[];
  hasEdema: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GrowthRecord {
  _id: string;
  child: string;
  date: string;
  ageInMonths: number;
  height: number;
  weight: number;
  whz: number;
  classification: {
    whz: 'normal' | 'mam' | 'sam';
  };
  trendDrop: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Alert {
  _id: string;
  child: string;
  growthRecord?: string;
  level: 'normal' | 'mam' | 'sam';
  message: string;
  resolved: boolean;
  autoEscalated: boolean;
  escalatedAt?: string;
  supervisorNotified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Recommendation {
  _id: string;
  child: string;
  type: 'sam' | 'mam' | 'nutrition' | 'followup';
  message: string;
  createdBy: string;
  confirmed: boolean;
  confirmedAt?: string;
  method?: 'otp' | 'signature' | 'manual';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: 'asha' | 'anm' | 'parent';
  village?: string;
}

export interface CreateChildData {
  name: string;
  dob: string;
  gender: 'male' | 'female';
  village?: string;
  parentId?: string;
}

export interface GrowthRecordData {
  date: string;
  height: number;
  weight: number;
  hasEdema?: boolean;
}

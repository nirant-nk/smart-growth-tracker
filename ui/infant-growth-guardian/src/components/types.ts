export interface Child {
  _id: string;
  name: string;
  dob: string;
  gender: 'male' | 'female';
  village: string;
}

export interface Alert {
  _id: string;
  child: Child;
  level: 'sam' | 'mam' | 'normal';
  message: string;
  createdAt: string;
  resolved: boolean;
}

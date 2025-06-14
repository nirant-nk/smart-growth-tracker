
const API_BASE_URL = 'http://localhost:6069/api';

class ApiClient {
  private _token: string | null = null;

  constructor() {
    this._token = localStorage.getItem('token');
  }

  get token() {
    return this._token;
  }

  setToken(token: string) {
    this._token = token;
    localStorage.setItem('token', token);
  }

  removeToken() {
    this._token = null;
    localStorage.removeItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this._token) {
      headers['Authorization'] = `Bearer ${this._token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(credentials: { phone: string; password: string }) {
    return this.request<{ token: string; role: string }>('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: {
    name: string;
    phone: string;
    password: string;
    role: string;
    village?: string;
  }) {
    return this.request<{ message: string }>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Children endpoints
  async createChild(childData: {
    name: string;
    dob: string;
    gender: string;
    village?: string;
    parent?: string;
  }) {
    // Convert date to ISO format and handle parent field
    const formattedData = {
      ...childData,
      dob: new Date(childData.dob).toISOString(),
    };
    
    // Only include parent if it's provided and not empty
    if (!formattedData.parent) {
      delete formattedData.parent;
    }
    
    return this.request<{ child: any }>('/children', {
      method: 'POST',
      body: JSON.stringify(formattedData),
    });
  }

  async getChildHistory(childId: string) {
    return this.request<{ child: any; growthHistory: any[] }>(`/children/${childId}/history`);
  }

  async getAllChildren() {
    return this.request<{ children: any[] }>('/children');
  }

  // Growth records endpoints
  async addGrowthRecord(childId: string, growthData: {
    date: string;
    height: number;
    weight: number;
    hasEdema?: boolean;
  }) {
    // Convert date to ISO format
    const formattedData = {
      ...growthData,
      date: new Date(growthData.date).toISOString(),
    };

    return this.request<{
      record: any;
      alerts: any[];
      recommendations: any[];
    }>(`/children/${childId}/growth`, {
      method: 'POST',
      body: JSON.stringify(formattedData),
    });
  }

  async getAlerts(childId: string) {
    return this.request<{ alerts: any[] }>(`/children/${childId}/alerts`);
  }

  async getAllAlerts() {
    return this.request<{ alerts: any[] }>('/alerts');
  }

  // Recommendations endpoints
  async getRecommendations(childId: string) {
    return this.request<{ recommendations: any[] }>(`/children/${childId}/recommendations`);
  }

  async confirmRecommendation(recId: string, method: string) {
    return this.request<{
      message: string;
      recommendation: any;
    }>(`/children/:childId/recommendations/${recId}/confirm`, {
      method: 'POST',
      body: JSON.stringify({ method }),
    });
  }
}

export const apiClient = new ApiClient();

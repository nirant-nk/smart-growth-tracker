// api.ts

const API_BASE_URL = 'http://localhost:6069/api';

class ApiClient {
  private _token: string | null = localStorage.getItem('token');
  private _parentId: string | null = localStorage.getItem('parentId');

  get token() { return this._token; }
  get parentId() { return this._parentId; }

  setToken(token: string) {
    this._token = token;
    localStorage.setItem('token', token);
  }

  setParentId(parentId: string) {
    this._parentId = parentId;
    localStorage.setItem('parentId', parentId);
  }

  removeToken() {
    this._token = null;
    this._parentId = null;
    localStorage.removeItem('token');
    localStorage.removeItem('parentId');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };
    if (this._token) headers['Authorization'] = `Bearer ${this._token}`;
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Auth
  async login(credentials: { phone: string; password: string }) {
    return this.request<{ parentId: string; token: string; role: string }>('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: { name: string; phone: string; password: string; role: string; village?: string }) {
    return this.request<{ message: string }>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Children
  async createChild(childData: { name: string; dob: string; gender: string; village?: string }) {
    const formatted = { ...childData, dob: new Date(childData.dob).toISOString() };
    return this.request<{ child: unknown }>('/children', {
      method: 'POST',
      body: JSON.stringify(formatted),
    });
  }

  async getAllChildren() {
    return this.request<{ children: unknown[] }>('/children');
  }

  async getChildHistory(childId: string) {
    return this.request<{ child: unknown; growthHistory: unknown[] }>(`/children/${childId}/history`);
  }

  // Growth Records
  async addGrowthRecord(childId: string, growthData: { date: string; height: number; weight: number; hasEdema?: boolean }) {
    const formattedData = { ...growthData, date: new Date(growthData.date).toISOString() };
    return this.request<{ record: unknown; alerts: unknown[]; recommendations: unknown[] }>(
      `/children/${childId}/growth`,
      { method: 'POST', body: JSON.stringify(formattedData) }
    );
  }

  async getAlerts(childId: string) {
    return this.request<{ alerts: unknown[] }>(`/children/${childId}/alerts`);
  }

  async getAllAlerts() {
    return this.request<{ alerts: unknown[] }>('/alerts');
  }

  // Recommendations
  async getRecommendations(childId: string) {
    return this.request<{ recommendations: unknown[] }>(`/children/${childId}/recommendations`);
  }

  async confirmRecommendation(childId: string, recId: string, method: string) {
    return this.request<{ message: string; recommendation: unknown }>(
      `/children/${childId}/recommendations/${recId}/confirm`,
      { method: 'POST', body: JSON.stringify({ method }) }
    );
  }
}

export const apiClient = new ApiClient();

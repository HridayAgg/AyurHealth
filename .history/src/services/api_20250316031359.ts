import { UserState, UserProfile, HealthMetrics } from '../types/user';

class ApiService {
  private static instance: ApiService;
  private baseUrl: string = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  private authToken: string | null = null;

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  }

  public setAuthToken(token: string): void {
    this.authToken = token;
  }

  // User Profile Management
  public async getUserProfile(userId: string): Promise<UserState> {
    return this.request<UserState>(`/users/${userId}`);
  }

  public async updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<UserProfile> {
    return this.request<UserProfile>(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(profile),
    });
  }

  public async updateHealthMetrics(userId: string, metrics: HealthMetrics): Promise<void> {
    await this.request(`/users/${userId}/metrics`, {
      method: 'POST',
      body: JSON.stringify(metrics),
    });
  }

  // Ayurvedic Assessment
  public async submitPrakritiAssessment(userId: string, answers: Record<string, number>): Promise<void> {
    await this.request(`/users/${userId}/prakriti-assessment`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }

  public async getAyurvedicRecommendations(userId: string): Promise<any> {
    return this.request(`/users/${userId}/recommendations`);
  }

  // Health Data Sync
  public async syncGoogleFitData(userId: string, data: any): Promise<void> {
    await this.request(`/users/${userId}/sync/googlefit`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Preferences
  public async updateUserPreferences(userId: string, preferences: any): Promise<void> {
    await this.request(`/users/${userId}/preferences`, {
      method: 'PATCH',
      body: JSON.stringify(preferences),
    });
  }

  // Analytics
  public async getUserInsights(userId: string, timeRange: string): Promise<any> {
    return this.request(`/users/${userId}/insights`, {
      method: 'GET',
      headers: {
        'X-Time-Range': timeRange,
      },
    });
  }
}

export default ApiService; 
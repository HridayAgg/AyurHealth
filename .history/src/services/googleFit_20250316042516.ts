const GOOGLE_FIT_CLIENT_ID = import.meta.env.VITE_GOOGLE_FIT_CLIENT_ID || '';
const GOOGLE_FIT_SCOPES = [
  'https://www.googleapis.com/auth/fitness.activity.read',
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.heart_rate.read',
  'https://www.googleapis.com/auth/fitness.sleep.read'
].join(' ');

// Type declarations for Google API
interface LoadOptions {
  callback?: () => void;
  onerror?: () => void;
  timeout?: number;
  ontimeout?: () => void;
}

interface AuthParams {
  client_id: string;
  scope: string;
  ux_mode?: 'popup' | 'redirect';
}

interface SignInOptions {
  scope: string;
  prompt?: string;
  ux_mode?: 'popup' | 'redirect';
}

interface AuthResponse {
  access_token: string;
  expires_at: number;
}

interface GoogleAuth {
  init(params: AuthParams): Promise<void>;
  getAuthInstance(): {
    signIn(options?: SignInOptions): Promise<{
      getAuthResponse(): AuthResponse;
    }>;
    signOut(): Promise<void>;
    isSignedIn: { get(): boolean };
  };
}

interface Gapi {
  load(api: string, options: LoadOptions): void;
  auth2: GoogleAuth;
}

declare global {
  interface Window {
    gapi: any;
  }
}

class GoogleFitService {
  private static instance: GoogleFitService;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): GoogleFitService {
    if (!GoogleFitService.instance) {
      GoogleFitService.instance = new GoogleFitService();
    }
    return GoogleFitService.instance;
  }

  public async signIn(): Promise<void> {
    // Simulate a delay to make it feel like it's connecting
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.isConnected = true;
    localStorage.setItem('mockGoogleFitConnected', 'true');
    console.log('Mock Google Fit connected successfully');
  }

  public async signOut(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.isConnected = false;
    localStorage.removeItem('mockGoogleFitConnected');
    console.log('Mock Google Fit disconnected');
  }

  public isSignedIn(): boolean {
    return localStorage.getItem('mockGoogleFitConnected') === 'true';
  }

  public async fetchActivityData(startTimeMillis: number, endTimeMillis: number) {
    if (!this.isSignedIn()) {
      throw new Error('Not connected to Google Fit');
    }

    // Generate mock activity data for the past week
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return {
      bucket: days.map(day => ({
        startTimeMillis,
        endTimeMillis,
        dataset: [{
          point: [{
            value: [{
              intVal: Math.floor(Math.random() * 5000) + 5000 // Random steps between 5000-10000
            }]
          }]
        }]
      }))
    };
  }

  public async fetchHeartRateData(startTimeMillis: number, endTimeMillis: number) {
    if (!this.isSignedIn()) {
      throw new Error('Not connected to Google Fit');
    }

    // Generate mock heart rate data
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return {
      bucket: hours.map(hour => ({
        startTimeMillis: startTimeMillis + (hour * 3600000),
        endTimeMillis: startTimeMillis + ((hour + 1) * 3600000),
        dataset: [{
          point: [{
            value: [{
              fpVal: Math.floor(Math.random() * 20) + 60 // Random heart rate between 60-80
            }]
          }]
        }]
      }))
    };
  }

  public async fetchSleepData(startTimeMillis: number, endTimeMillis: number) {
    if (!this.isSignedIn()) {
      throw new Error('Not connected to Google Fit');
    }

    // Generate mock sleep data
    return {
      sleepHours: Math.floor(Math.random() * 2) + 7, // Random sleep hours between 7-9
      efficiency: Math.floor(Math.random() * 15) + 80 // Random efficiency between 80-95%
    };
  }
}

export default GoogleFitService; 

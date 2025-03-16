const GOOGLE_FIT_CLIENT_ID = import.meta.env.VITE_GOOGLE_FIT_CLIENT_ID || '';
const GOOGLE_FIT_SCOPES = [
  'https://www.googleapis.com/auth/fitness.activity.read',
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.heart_rate.read',
  'https://www.googleapis.com/auth/fitness.sleep.read'
].join(' ');

interface GapiLoadConfig {
  callback: () => void;
  onerror: () => void;
}

interface GapiAuth2InitOptions {
  client_id: string;
  scope: string;
}

interface GapiAuthResponse {
  access_token: string;
  expires_at: number;
}

interface GapiUser {
  getAuthResponse(): GapiAuthResponse;
}

interface GapiAuth2Instance {
  signIn(options?: { scope: string }): Promise<GapiUser>;
  signOut(): Promise<void>;
  isSignedIn: { get(): boolean };
}

interface GapiAuth2 {
  init(params: GapiAuth2InitOptions): Promise<void>;
  getAuthInstance(): GapiAuth2Instance;
}

interface Gapi {
  load(api: string, config: GapiLoadConfig): void;
  auth2: GapiAuth2;
}

declare global {
  interface Window {
    gapi: Gapi;
  }
}

class GoogleFitService {
  private static instance: GoogleFitService;
  private accessToken: string | null = null;
  private gapiInitialized: boolean = false;
  private initializationPromise: Promise<void> | null = null;

  private constructor() {
    if (!import.meta.env.VITE_GOOGLE_FIT_CLIENT_ID) {
      console.error('Google Fit Client ID is not configured. Please check your environment variables.');
    }
    this.initializationPromise = this.loadGoogleApi();
  }

  private loadGapiScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google API script'));
      
      document.body.appendChild(script);
    });
  }

  private async loadGoogleApi(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      console.log('Loading Google API script...');
      await this.loadGapiScript();
      
      return new Promise((resolve, reject) => {
        window.gapi.load('auth2', {
          callback: async () => {
            try {
              if (!import.meta.env.VITE_GOOGLE_FIT_CLIENT_ID) {
                throw new Error('Google Fit Client ID is not configured');
              }

              console.log('Initializing Google Auth...');
              await window.gapi.auth2.init({
                client_id: import.meta.env.VITE_GOOGLE_FIT_CLIENT_ID,
                scope: GOOGLE_FIT_SCOPES,
              });
              
              console.log('Google Auth initialized successfully');
              this.gapiInitialized = true;
              resolve();
            } catch (error) {
              console.error('Error initializing Google Auth:', error);
              reject(error);
            }
          },
          onerror: () => {
            reject(new Error('Failed to load auth2'));
          }
        });
      });
    } catch (error) {
      console.error('Error in loadGoogleApi:', error);
      throw error;
    }
  }

  public static getInstance(): GoogleFitService {
    if (!GoogleFitService.instance) {
      GoogleFitService.instance = new GoogleFitService();
    }
    return GoogleFitService.instance;
  }

  private async waitForGapiInitialization(): Promise<void> {
    if (this.gapiInitialized) return;
    
    if (this.initializationPromise) {
      await this.initializationPromise;
      return;
    }

    let attempts = 0;
    const maxAttempts = 10;
    const delayMs = 500;

    while (!this.gapiInitialized && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      attempts++;
    }

    if (!this.gapiInitialized) {
      throw new Error('Failed to initialize Google API');
    }
  }

  public async signIn(): Promise<void> {
    try {
      await this.waitForGapiInitialization();
      const auth2 = window.gapi.auth2.getAuthInstance();
      
      if (!auth2) {
        throw new Error('Google Auth is not initialized');
      }

      const googleUser = await auth2.signIn({
        scope: GOOGLE_FIT_SCOPES
      });

      const authResponse = googleUser.getAuthResponse();
      this.accessToken = authResponse.access_token;
      
      // Store token and expiry
      localStorage.setItem('googleFitToken', this.accessToken);
      localStorage.setItem('googleFitTokenExpiry', String(authResponse.expires_at));
      
    } catch (error) {
      console.error('Error signing in with Google Fit:', error);
      throw error;
    }
  }

  public async signOut(): Promise<void> {
    try {
      await this.waitForGapiInitialization();
      const auth2 = window.gapi.auth2.getAuthInstance();
      
      if (auth2) {
        await auth2.signOut();
      }
      
      this.accessToken = null;
      localStorage.removeItem('googleFitToken');
      localStorage.removeItem('googleFitTokenExpiry');
    } catch (error) {
      console.error('Error signing out from Google Fit:', error);
      throw error;
    }
  }

  public isSignedIn(): boolean {
    const token = localStorage.getItem('googleFitToken');
    const expiry = localStorage.getItem('googleFitTokenExpiry');
    
    if (!token || !expiry) return false;
    
    // Check if token is expired
    const expiryTime = parseInt(expiry, 10);
    const now = Date.now();
    
    return expiryTime > now;
  }

  public async fetchActivityData(startTimeMillis: number, endTimeMillis: number) {
    const token = localStorage.getItem('googleFitToken');
    if (!token) {
      throw new Error('Not authenticated with Google Fit');
    }

    try {
      const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          aggregateBy: [{
            dataTypeName: "com.google.step_count.delta",
            dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
          }],
          bucketByTime: { durationMillis: 86400000 }, // 1 day
          startTimeMillis,
          endTimeMillis
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch activity data');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching activity data:', error);
      throw error;
    }
  }

  public async fetchHeartRateData(startTimeMillis: number, endTimeMillis: number) {
    const token = localStorage.getItem('googleFitToken');
    if (!token) {
      throw new Error('Not authenticated with Google Fit');
    }

    try {
      const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          aggregateBy: [{
            dataTypeName: "com.google.heart_rate.bpm",
            dataSourceId: "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm"
          }],
          bucketByTime: { durationMillis: 3600000 }, // 1 hour
          startTimeMillis,
          endTimeMillis
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch heart rate data');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching heart rate data:', error);
      throw error;
    }
  }
}

export default GoogleFitService; 
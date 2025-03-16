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
    gapi: Gapi;
  }
}

class GoogleFitService {
  private static instance: GoogleFitService;
  private accessToken: string | null = null;
  private gapiInitialized: boolean = false;
  private initializationPromise: Promise<void> | null = null;
  private initializationAttempts: number = 0;
  private readonly maxInitAttempts: number = 3;

  private constructor() {
    if (!import.meta.env.VITE_GOOGLE_FIT_CLIENT_ID) {
      console.error('Google Fit Client ID is not configured. Please check your environment variables.');
    }
    this.initializationPromise = this.loadGoogleApi();
  }

  public static getInstance(): GoogleFitService {
    if (!GoogleFitService.instance) {
      GoogleFitService.instance = new GoogleFitService();
    }
    return GoogleFitService.instance;
  }

  private loadGapiScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      // Remove any existing Google API script
      const existingScript = document.querySelector('script[src*="apis.google.com"]');
      if (existingScript) {
        existingScript.remove();
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
          callback: () => {
            try {
              if (!import.meta.env.VITE_GOOGLE_FIT_CLIENT_ID) {
                throw new Error('Google Fit Client ID is not configured');
              }

              console.log('Initializing Google Auth...');
              window.gapi.auth2.init({
                client_id: import.meta.env.VITE_GOOGLE_FIT_CLIENT_ID,
                scope: GOOGLE_FIT_SCOPES,
                ux_mode: 'popup',
              }).then(() => {
                console.log('Google Auth initialized successfully');
                this.gapiInitialized = true;
                resolve();
              }).catch((error) => {
                console.error('Error initializing Google Auth:', error);
                reject(error);
              });
            } catch (error) {
              console.error('Error in auth2 callback:', error);
              reject(error);
            }
          },
          onerror: () => {
            reject(new Error('Failed to load auth2'));
          },
          timeout: 10000,
          ontimeout: () => {
            reject(new Error('Timeout loading auth2'));
          }
        });
      });
    } catch (error) {
      console.error('Error in loadGoogleApi:', error);
      throw error;
    }
  }

  private async reinitialize(): Promise<void> {
    this.gapiInitialized = false;
    this.initializationPromise = this.loadGoogleApi();
    await this.initializationPromise;
  }

  private async waitForGapiInitialization(): Promise<void> {
    if (this.gapiInitialized) return;
    
    if (this.initializationPromise) {
      try {
        await this.initializationPromise;
        return;
      } catch (error) {
        if (this.initializationAttempts < this.maxInitAttempts) {
          this.initializationAttempts++;
          console.log(`Retrying initialization (attempt ${this.initializationAttempts})...`);
          await this.reinitialize();
          return;
        }
        throw error;
      }
    }

    throw new Error('Failed to initialize Google API');
  }

  public async signIn(): Promise<void> {
    try {
      await this.waitForGapiInitialization();
      const auth2 = window.gapi.auth2.getAuthInstance();
      
      if (!auth2) {
        throw new Error('Google Auth is not initialized');
      }

      // Check if popups are blocked
      const popupTest = window.open('', '_blank');
      if (!popupTest) {
        throw new Error('Google Sign-In popup was blocked. Please allow popups for this site and try again.');
      }
      popupTest.close();

      console.log('Starting Google Fit sign-in process...');
      const googleUser = await auth2.signIn({
        scope: GOOGLE_FIT_SCOPES,
        prompt: 'select_account consent',  // Always show the account selection dialog
        ux_mode: 'popup'
      }).catch((error: any) => {
        console.error('Detailed sign-in error:', error);
        if (error.error === 'popup_blocked_by_browser') {
          throw new Error('Google Sign-In popup was blocked. Please allow popups for this site and try again.');
        } else if (error.error === 'access_denied') {
          throw new Error('You need to grant the requested permissions to use Google Fit integration.');
        } else if (error.error === 'immediate_failed') {
          throw new Error('Automatic sign-in failed. Please try signing in manually.');
        }
        throw error;
      });

      console.log('Successfully signed in, getting auth response...');
      const authResponse = googleUser.getAuthResponse();
      this.accessToken = authResponse.access_token;
      
      console.log('Storing authentication tokens...');
      localStorage.setItem('googleFitToken', this.accessToken);
      localStorage.setItem('googleFitTokenExpiry', String(authResponse.expires_at));
      console.log('Google Fit sign-in completed successfully');
      
    } catch (error) {
      console.error('Error signing in with Google Fit:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to connect to Google Fit: ${error.message}`);
      }
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
          bucketByTime: { durationMillis: 86400000 },
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
          bucketByTime: { durationMillis: 3600000 },
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

const GOOGLE_FIT_CLIENT_ID = process.env.VITE_GOOGLE_FIT_CLIENT_ID || '';
const GOOGLE_FIT_SCOPES = [
  'https://www.googleapis.com/auth/fitness.activity.read',
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.heart_rate.read',
  'https://www.googleapis.com/auth/fitness.sleep.read'
];

class GoogleFitService {
  private static instance: GoogleFitService;
  private accessToken: string | null = null;

  private constructor() {
    // Load the Google API client library
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: GOOGLE_FIT_CLIENT_ID,
          scope: GOOGLE_FIT_SCOPES.join(' ')
        });
      });
    };
    document.body.appendChild(script);
  }

  public static getInstance(): GoogleFitService {
    if (!GoogleFitService.instance) {
      GoogleFitService.instance = new GoogleFitService();
    }
    return GoogleFitService.instance;
  }

  public async signIn(): Promise<void> {
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      this.accessToken = googleUser.getAuthResponse().access_token;
      localStorage.setItem('googleFitToken', this.accessToken);
    } catch (error) {
      console.error('Error signing in with Google Fit:', error);
      throw error;
    }
  }

  public async signOut(): Promise<void> {
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      await auth2.signOut();
      this.accessToken = null;
      localStorage.removeItem('googleFitToken');
    } catch (error) {
      console.error('Error signing out from Google Fit:', error);
      throw error;
    }
  }

  public isSignedIn(): boolean {
    return !!this.accessToken || !!localStorage.getItem('googleFitToken');
  }

  public async fetchActivityData(startTimeMillis: number, endTimeMillis: number) {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google Fit');
    }

    const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
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

    return response.json();
  }

  public async fetchHeartRateData(startTimeMillis: number, endTimeMillis: number) {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google Fit');
    }

    const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
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

    return response.json();
  }
}

export default GoogleFitService; 
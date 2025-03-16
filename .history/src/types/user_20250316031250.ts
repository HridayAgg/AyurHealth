export interface Dosha {
  vata: number;
  pitta: number;
  kapha: number;
}

export interface AyurvedicProfile {
  prakriti: Dosha;  // Natural constitution
  vikriti: Dosha;   // Current imbalance
  lastAssessmentDate: string;
  dominantDosha: 'vata' | 'pitta' | 'kapha' | 'vata-pitta' | 'pitta-kapha' | 'vata-kapha' | 'tridoshic';
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  preferredActivities: string[];
  meditationPreference: 'guided' | 'unguided' | 'both';
  notificationPreferences: {
    dailyRoutineReminders: boolean;
    meditationReminders: boolean;
    mealTimeReminders: boolean;
    exerciseReminders: boolean;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  ayurvedicProfile: AyurvedicProfile;
  preferences: UserPreferences;
  googleFitConnected: boolean;
  createdAt: string;
  updatedAt: string;
}

// Health metrics that we can get from Google Fit
export interface HealthMetrics {
  steps: number;
  activeMinutes: number;
  heartRate: number;
  sleepHours: number;
  sleepEfficiency: number;
  lastUpdated: string;
}

// Combined user state including health metrics
export interface UserState {
  profile: UserProfile;
  healthMetrics: HealthMetrics;
  doshaImbalances: {
    vata: string[];
    pitta: string[];
    kapha: string[];
  };
} 
import { UserProfile, AyurvedicProfile, UserPreferences, HealthMetrics, UserState } from '../types/user';

class UserProfileService {
  private static instance: UserProfileService;
  private currentUser: UserState | null = null;

  private constructor() {}

  public static getInstance(): UserProfileService {
    if (!UserProfileService.instance) {
      UserProfileService.instance = new UserProfileService();
    }
    return UserProfileService.instance;
  }

  // Calculate dosha imbalances based on health metrics and user profile
  private calculateDoshaImbalances(metrics: HealthMetrics, profile: UserProfile): string[][] {
    const imbalances: [string[], string[], string[]] = [[], [], []]; // [vata, pitta, kapha]
    
    // Vata imbalance indicators
    if (metrics.sleepHours < 6 || metrics.sleepEfficiency < 80) {
      imbalances[0].push('Irregular sleep patterns');
    }
    if (metrics.steps < 7000) {
      imbalances[0].push('Insufficient physical activity');
    }

    // Pitta imbalance indicators
    if (metrics.heartRate > 80) {
      imbalances[1].push('Elevated heart rate');
    }
    if (metrics.activeMinutes > 120) {
      imbalances[1].push('Excessive physical activity');
    }

    // Kapha imbalance indicators
    if (metrics.sleepHours > 9) {
      imbalances[2].push('Excessive sleep');
    }
    if (metrics.steps < 5000 && metrics.activeMinutes < 30) {
      imbalances[2].push('Sedentary lifestyle');
    }

    return imbalances;
  }

  // Update user's health metrics and recalculate imbalances
  public async updateHealthMetrics(metrics: HealthMetrics): Promise<void> {
    if (!this.currentUser) throw new Error('No user logged in');

    // Update metrics
    this.currentUser.healthMetrics = metrics;

    // Recalculate imbalances
    const [vata, pitta, kapha] = this.calculateDoshaImbalances(metrics, this.currentUser.profile);
    this.currentUser.doshaImbalances = { vata, pitta, kapha };

    // TODO: Send updates to backend
    await this.saveUserState();
  }

  // Get personalized recommendations based on user's current state
  public getPersonalizedRecommendations(): any {
    if (!this.currentUser) throw new Error('No user logged in');

    const { profile, healthMetrics, doshaImbalances } = this.currentUser;
    
    // TODO: Implement recommendation logic based on:
    // - User's prakriti (natural constitution)
    // - Current dosha imbalances
    // - Health metrics
    // - Season
    // - Time of day
    return {
      // Placeholder for now
      lifestyle: [],
      diet: [],
      exercises: [],
      herbs: []
    };
  }

  // Save current user state to backend
  private async saveUserState(): Promise<void> {
    if (!this.currentUser) return;

    // TODO: Implement API call to save user state
    try {
      // const response = await fetch('/api/user/state', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(this.currentUser)
      // });
      console.log('Saving user state...', this.currentUser);
    } catch (error) {
      console.error('Error saving user state:', error);
      throw error;
    }
  }

  // Load user profile and state
  public async loadUserProfile(userId: string): Promise<UserState> {
    // TODO: Implement API call to load user profile
    try {
      // const response = await fetch(`/api/user/${userId}`);
      // this.currentUser = await response.json();
      
      // Temporary mock data
      this.currentUser = {
        profile: {
          id: userId,
          email: 'user@example.com',
          name: 'Test User',
          dateOfBirth: '1990-01-01',
          gender: 'other',
          ayurvedicProfile: {
            prakriti: { vata: 33, pitta: 33, kapha: 34 },
            vikriti: { vata: 35, pitta: 40, kapha: 25 },
            lastAssessmentDate: new Date().toISOString(),
            dominantDosha: 'tridoshic'
          },
          preferences: {
            dietaryRestrictions: [],
            preferredActivities: ['yoga', 'walking'],
            meditationPreference: 'guided',
            notificationPreferences: {
              dailyRoutineReminders: true,
              meditationReminders: true,
              mealTimeReminders: true,
              exerciseReminders: true
            }
          },
          googleFitConnected: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        healthMetrics: {
          steps: 8000,
          activeMinutes: 45,
          heartRate: 72,
          sleepHours: 7.5,
          sleepEfficiency: 85,
          lastUpdated: new Date().toISOString()
        },
        doshaImbalances: {
          vata: [],
          pitta: [],
          kapha: []
        }
      };

      return this.currentUser;
    } catch (error) {
      console.error('Error loading user profile:', error);
      throw error;
    }
  }
}

export default UserProfileService; 
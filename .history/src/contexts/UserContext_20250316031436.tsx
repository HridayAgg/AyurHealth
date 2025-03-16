import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserState, HealthMetrics } from '../types/user';
import UserProfileService from '../services/userProfile';
import ApiService from '../services/api';

interface UserContextType {
  userState: UserState | null;
  loading: boolean;
  error: string | null;
  updateHealthMetrics: (metrics: HealthMetrics) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  submitPrakritiAssessment: (answers: Record<string, number>) => Promise<void>;
  updatePreferences: (preferences: any) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userState, setUserState] = useState<UserState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const profileService = UserProfileService.getInstance();
  const apiService = ApiService.getInstance();

  const refreshUserProfile = async () => {
    try {
      setLoading(true);
      // TODO: Get actual user ID from auth context
      const userId = 'current-user-id';
      const profile = await profileService.loadUserProfile(userId);
      setUserState(profile);
      setError(null);
    } catch (err) {
      setError('Failed to load user profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateHealthMetrics = async (metrics: HealthMetrics) => {
    try {
      setLoading(true);
      await profileService.updateHealthMetrics(metrics);
      if (userState?.profile.id) {
        await apiService.updateHealthMetrics(userState.profile.id, metrics);
      }
      await refreshUserProfile();
    } catch (err) {
      setError('Failed to update health metrics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitPrakritiAssessment = async (answers: Record<string, number>) => {
    try {
      setLoading(true);
      if (userState?.profile.id) {
        await apiService.submitPrakritiAssessment(userState.profile.id, answers);
        await refreshUserProfile();
      }
    } catch (err) {
      setError('Failed to submit prakriti assessment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (preferences: any) => {
    try {
      setLoading(true);
      if (userState?.profile.id) {
        await apiService.updateUserPreferences(userState.profile.id, preferences);
        await refreshUserProfile();
      }
    } catch (err) {
      setError('Failed to update preferences');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUserProfile();
  }, []);

  const value = {
    userState,
    loading,
    error,
    updateHealthMetrics,
    refreshUserProfile,
    submitPrakritiAssessment,
    updatePreferences,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext; 
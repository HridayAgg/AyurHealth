interface UserInfo {
  preferences?: {
    dosha?: string;
    diet?: string[];
    allergies?: string[];
    healthGoals?: string[];
    [key: string]: any;
  };
  healthData?: {
    lastReported?: {
      sleep?: number;
      stress?: number;
      digestion?: number;
      energy?: number;
      [key: string]: any;
    };
    conditions?: string[];
    medications?: string[];
    [key: string]: any;
  };
  [key: string]: any;
}

interface ConversationMemory {
  messages: {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
  }[];
  userInfo: UserInfo;
}

interface UserProfile {
  name: string;
  email: string;
  primaryDosha: 'vata' | 'pitta' | 'kapha' | '';
  secondaryDosha: 'vata' | 'pitta' | 'kapha' | '';
  dietaryPreferences: string[];
  healthConditions: string[];
  dailyRoutine: {
    wakeUpTime: string;
    bedTime: string;
    meditationTime: string;
  };
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: 'english' | 'sanskrit';
  };
}

class MemoryService {
  private static instance: MemoryService;
  private memory: ConversationMemory;
  private readonly MAX_MESSAGES = 20; // Keep last 20 messages for context
  private messages: { role: string; content: string }[] = [];
  private userProfile: UserProfile | null = null;

  private constructor() {
    // Initialize with empty memory or load from localStorage
    const savedMemory = localStorage.getItem('ayurbot_memory');
    this.memory = savedMemory 
      ? JSON.parse(savedMemory) 
      : {
          messages: [],
          userInfo: {
            preferences: {},
            healthData: {}
          }
        };
    this.loadFromLocalStorage();
  }

  public static getInstance(): MemoryService {
    if (!MemoryService.instance) {
      MemoryService.instance = new MemoryService();
    }
    return MemoryService.instance;
  }

  private loadFromLocalStorage() {
    try {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        this.messages = JSON.parse(savedMessages);
      }

      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        this.userProfile = JSON.parse(savedProfile);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('ayurbot_memory', JSON.stringify(this.memory));
    localStorage.setItem('chatMessages', JSON.stringify(this.messages));
    if (this.userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
    }
  }

  public addMessage(role: 'user' | 'assistant' | 'system', content: string): void {
    this.memory.messages.push({
      role,
      content,
      timestamp: new Date()
    });

    // Keep only the last MAX_MESSAGES messages
    if (this.memory.messages.length > this.MAX_MESSAGES) {
      this.memory.messages = this.memory.messages.slice(-this.MAX_MESSAGES);
    }

    this.messages.push({ role, content });
    this.saveToLocalStorage();
  }

  public updateUserInfo(info: Partial<UserInfo>): void {
    this.memory.userInfo = {
      ...this.memory.userInfo,
      ...info
    };
    this.saveToLocalStorage();
  }

  public getUserInfo(): UserInfo {
    return this.memory.userInfo;
  }

  public getRecentMessages(count: number = this.MAX_MESSAGES): any[] {
    return this.memory.messages.slice(-count).map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }

  public getContextForPrompt(): string {
    const { preferences, healthData } = this.memory.userInfo;
    let context = "User Context:\n";

    if (preferences?.dosha) {
      context += `- Dominant dosha: ${preferences.dosha}\n`;
    }
    if (preferences?.diet?.length) {
      context += `- Dietary preferences: ${preferences.diet.join(', ')}\n`;
    }
    if (preferences?.allergies?.length) {
      context += `- Allergies: ${preferences.allergies.join(', ')}\n`;
    }
    if (healthData?.conditions?.length) {
      context += `- Health conditions: ${healthData.conditions.join(', ')}\n`;
    }
    if (healthData?.lastReported) {
      context += "- Recent health metrics:\n";
      Object.entries(healthData.lastReported).forEach(([key, value]) => {
        context += `  * ${key}: ${value}\n`;
      });
    }

    return context;
  }

  public clearMemory(): void {
    this.memory = {
      messages: [],
      userInfo: {
        preferences: {},
        healthData: {}
      }
    };
    this.messages = [];
    localStorage.removeItem('ayurbot_memory');
    localStorage.removeItem('chatMessages');
    localStorage.removeItem('userProfile');
  }

  public getUserProfile(): UserProfile | null {
    return this.userProfile;
  }

  public saveUserProfile(profile: UserProfile) {
    this.userProfile = profile;
    this.saveToLocalStorage();
  }

  public clearUserProfile() {
    this.userProfile = null;
    localStorage.removeItem('userProfile');
  }
}

export default MemoryService; 
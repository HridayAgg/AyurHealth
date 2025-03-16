interface UserInfo {
  dosha?: string;
  prakruti?: string;
  agni?: string;
  diet?: string;
  routine?: string;
  conditions?: string[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export class MemoryService {
  private static instance: MemoryService;
  private userInfo: UserInfo;
  private messages: Message[];

  private constructor() {
    this.loadFromLocalStorage();
  }

  public static getInstance(): MemoryService {
    if (!MemoryService.instance) {
      MemoryService.instance = new MemoryService();
    }
    return MemoryService.instance;
  }

  private loadFromLocalStorage() {
    if (typeof window === 'undefined') return;
    
    try {
      const savedUserInfo = localStorage.getItem('ayurvedic_user_info');
      const savedMessages = localStorage.getItem('ayurvedic_messages');

      this.userInfo = savedUserInfo ? JSON.parse(savedUserInfo) : {};
      this.messages = savedMessages ? JSON.parse(savedMessages) : [];
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      this.userInfo = {};
      this.messages = [];
    }
  }

  private saveToLocalStorage() {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('ayurvedic_user_info', JSON.stringify(this.userInfo));
      localStorage.setItem('ayurvedic_messages', JSON.stringify(this.messages));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  public addMessage(role: 'user' | 'assistant', content: string) {
    this.messages.push({ role, content });
    this.saveToLocalStorage();
  }

  public getRecentMessages(): Message[] {
    return this.messages.slice(-10); // Return last 10 messages
  }

  public updateUserInfo(info: Partial<UserInfo>) {
    this.userInfo = { ...this.userInfo, ...info };
    this.saveToLocalStorage();
  }

  public getUserInfo(): UserInfo {
    return this.userInfo;
  }

  public clearMemory() {
    this.userInfo = {};
    this.messages = [];
    this.saveToLocalStorage();
  }
} 
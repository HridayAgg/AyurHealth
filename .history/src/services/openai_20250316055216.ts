import OpenAI from 'openai';
import MemoryService from './memoryService';

export class OpenAIService {
  private static instance: OpenAIService;
  private openai: OpenAI;
  private memoryService: MemoryService;

  private constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
    this.memoryService = MemoryService.getInstance();
  }

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  public async getAyurvedicResponse(messageHistory: { role: string; content: string }[]) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an Ayurvedic wellness guide, deeply knowledgeable in traditional Ayurvedic medicine and practices. Always prioritize traditional Ayurvedic solutions and natural remedies over modern medical interventions. Focus on holistic healing, considering the mind-body-spirit connection. Use Sanskrit terms with explanations when appropriate. Structure your responses to include Ayurvedic diagnosis, dosha-specific recommendations, herbal remedies, lifestyle adjustments, and preventive measures."
          },
          ...messageHistory
        ],
      });

      const response = completion.choices[0]?.message?.content || '';
      
      // Store the interaction in memory
      this.memoryService.addMessage('assistant', response);

      // Extract and store any new user information from the conversation
      this.updateUserInfoFromMessage(messageHistory[messageHistory.length - 1].content, response);

      return response;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to get response from OpenAI');
    }
  }

  private updateUserInfoFromMessage(userMessage: string, aiResponse: string): void {
    // Extract health-related information from user message
    const healthInfo: any = {};
    
    // Check for dosha mentions
    const doshaMatch = userMessage.match(/(?:my dosha is|I am|I have|I'm) (vata|pitta|kapha)/i);
    if (doshaMatch) {
      healthInfo.preferences = { dosha: doshaMatch[1].toLowerCase() };
    }

    // Check for prakruti (natural constitution)
    const prakrutiMatch = userMessage.match(/(?:my prakruti is|my constitution is) ((?:vata|pitta|kapha)(?:-(?:vata|pitta|kapha))?)/i);
    if (prakrutiMatch) {
      healthInfo.preferences = { 
        ...healthInfo.preferences,
        prakruti: prakrutiMatch[1].toLowerCase()
      };
    }

    // Check for dietary preferences
    const dietaryPrefs = [];
    if (userMessage.toLowerCase().includes('vegetarian')) dietaryPrefs.push('vegetarian');
    if (userMessage.toLowerCase().includes('vegan')) dietaryPrefs.push('vegan');
    if (userMessage.toLowerCase().includes('sattvic')) dietaryPrefs.push('sattvic');
    if (dietaryPrefs.length > 0) {
      healthInfo.preferences = { 
        ...healthInfo.preferences,
        diet: dietaryPrefs
      };
    }

    // Check for health conditions using Ayurvedic terms
    const ayurvedicConditions = userMessage.match(/(?:I have|I suffer from|I experience) ([^.!?]+)/i);
    if (ayurvedicConditions) {
      healthInfo.healthData = { 
        conditions: [ayurvedicConditions[1].trim()]
      };
    }

    // Check for digestive fire (agni) status
    const agniMatch = userMessage.match(/(?:my agni is|digestive fire is) (strong|weak|variable|irregular)/i);
    if (agniMatch) {
      healthInfo.healthData = {
        ...healthInfo.healthData,
        agni: agniMatch[1].toLowerCase()
      };
    }

    // Check for daily routine (dinacharya) preferences
    if (userMessage.toLowerCase().includes('wake up')) {
      const wakeTimeMatch = userMessage.match(/wake up at (\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i);
      if (wakeTimeMatch) {
        healthInfo.preferences = {
          ...healthInfo.preferences,
          dinacharya: {
            ...healthInfo.preferences?.dinacharya,
            wakeTime: wakeTimeMatch[1]
          }
        };
      }
    }

    // Update memory if new information was found
    if (Object.keys(healthInfo).length > 0) {
      this.memoryService.updateUserInfo(healthInfo);
    }
  }
} 
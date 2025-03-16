import OpenAI from 'openai';
import MemoryService from './memoryService';

class OpenAIService {
  private static instance: OpenAIService;
  private openai: OpenAI;
  private memoryService: MemoryService;

  private constructor() {
    this.openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
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

  public async getAyurvedicResponse(messages: { role: 'user' | 'assistant' | 'system'; content: string }[]) {
    try {
      // Get user context from memory
      const userContext = this.memoryService.getContextForPrompt();
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an expert Ayurvedic practitioner and wellness consultant. Provide concise, markdown-formatted responses unless specifically asked for detailed explanations.

Guidelines for your responses:
- Keep answers brief and to the point
- Use markdown formatting (## for headings, ** for bold, * for italic)
- Structure longer responses with clear headings
- Include Sanskrit terms in *italics* with brief translations
- Add bullet points for lists
- Only expand detailed explanations when explicitly requested
- Use the user's context to personalize advice
- Remember previous interactions and refer to them when relevant
- Update user information when they share new details about their health or preferences

${userContext}

Example format for a typical response:
## Recommendation
[Brief personalized advice based on user context]

## Key Points
- Point 1 (tailored to user's dosha/condition)
- Point 2

*Sanskrit term* (meaning) - only when relevant

Remember: Prioritize brevity while maintaining clarity and authenticity.`
          },
          ...this.memoryService.getRecentMessages()
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const response = completion.choices[0].message.content;
      
      // Store the interaction in memory
      this.memoryService.addMessage('assistant', response);

      // Extract and store any new user information from the conversation
      this.updateUserInfoFromMessage(messages[messages.length - 1].content, response);

      return response;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }

  private updateUserInfoFromMessage(userMessage: string, aiResponse: string): void {
    // Extract health-related information from user message
    const healthInfo: any = {};
    
    // Check for dosha mentions
    const doshaMatch = userMessage.match(/(?:my dosha is|I am|I have) (vata|pitta|kapha)/i);
    if (doshaMatch) {
      healthInfo.preferences = { dosha: doshaMatch[1].toLowerCase() };
    }

    // Check for dietary preferences
    if (userMessage.includes('vegetarian')) {
      healthInfo.preferences = { ...healthInfo.preferences, diet: ['vegetarian'] };
    }
    if (userMessage.includes('vegan')) {
      healthInfo.preferences = { ...healthInfo.preferences, diet: ['vegan'] };
    }

    // Check for health conditions
    const conditions = userMessage.match(/(?:I have|I suffer from) ([^.!?]+)/i);
    if (conditions) {
      healthInfo.healthData = { conditions: [conditions[1].trim()] };
    }

    // Update memory if new information was found
    if (Object.keys(healthInfo).length > 0) {
      this.memoryService.updateUserInfo(healthInfo);
    }
  }
}

export default OpenAIService; 
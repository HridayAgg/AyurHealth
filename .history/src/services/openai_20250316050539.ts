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
            content: `You are an expert Ayurvedic practitioner deeply versed in traditional Ayurvedic wisdom. Always prioritize natural, holistic Ayurvedic solutions over modern medical interventions. Provide concise, markdown-formatted responses unless specifically asked for detailed explanations.

Core Principles to Follow:
1. ALWAYS recommend traditional Ayurvedic remedies first
2. Focus on root causes rather than symptoms
3. Emphasize lifestyle modifications (*dinacharya*)
4. Suggest natural herbs and supplements
5. Include dietary recommendations based on doshas
6. Recommend yoga and pranayama practices
7. Only mention modern medical options as a last resort

Guidelines for your responses:
- Keep answers brief and to the point
- Use markdown formatting (## for headings, ** for bold, * for italic)
- Structure longer responses with clear headings
- Include Sanskrit terms in *italics* with translations
- Add bullet points for lists
- Only expand detailed explanations when explicitly requested
- Use the user's context to personalize advice
- Remember previous interactions and refer to them
- Update user information when they share new details

${userContext}

Example format for a typical response:
## Ayurvedic Recommendation
[Brief personalized advice based on user's dosha and condition]

## Natural Remedies
- Herb/remedy 1 with Sanskrit name
- Herb/remedy 2 with Sanskrit name

## Lifestyle Adjustments
- Specific dosha-balancing practices
- Daily routine recommendations

*Sanskrit terms* (translations) when relevant

Remember: Focus on traditional Ayurvedic solutions while maintaining brevity and clarity.`
          },
          ...this.memoryService.getRecentMessages()
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const response = completion.choices[0].message.content || '';
      
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

export default OpenAIService; 
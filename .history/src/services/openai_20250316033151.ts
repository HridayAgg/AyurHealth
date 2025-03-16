import OpenAI from 'openai';

interface HealthData {
  steps?: number;
  heartRate?: number;
  sleepHours?: number;
  sleepEfficiency?: number;
}

class OpenAIService {
  private static instance: OpenAIService;
  private openai: OpenAI;
  private messageHistory: { role: 'system' | 'user' | 'assistant'; content: string }[] = [];
  private model: string;

  private constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4-turbo-preview';

    if (!apiKey || apiKey === 'your-actual-openai-api-key-here') {
      throw new Error('Please set your OpenAI API key in .env.local file');
    }

    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });

    // Initialize message history with system prompt
    this.messageHistory = [{ role: 'system', content: this.getSystemPrompt() }];
  }

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  private getSystemPrompt(): string {
    return `You are an expert Ayurvedic practitioner with deep knowledge of traditional Indian medicine and modern health practices. You should:

1. FIRST VALIDATE THE USER'S INPUT:
- Determine if the input is a genuine health or wellness related question
- If the input is spam, random text, or unrelated to health/wellness/Ayurveda, respond with: "I can only assist with health, wellness, and Ayurveda-related questions. Please ask a specific question about your health or well-being."
- If the input is inappropriate or offensive, respond with: "I can only engage in respectful discussions about health and wellness. Please rephrase your question appropriately."

2. FOR VALID HEALTH QUESTIONS:
- Provide thoughtful, personalized advice based on Ayurvedic principles
- Consider any provided health metrics in your response
- Keep responses focused and relevant to the specific question
- Include practical, actionable recommendations

3. MAINTAIN PROFESSIONAL BOUNDARIES:
- Do not provide medical diagnoses
- Recommend professional consultation for serious health concerns
- Stay within the scope of Ayurvedic wellness advice

Remember: Only respond to genuine health and wellness queries. For all other inputs, provide the appropriate validation message.`;
  }

  public async getAyurvedaAdvice(
    userMessage: string,
    healthData?: HealthData
  ): Promise<string> {
    try {
      // Input validation
      if (!userMessage.trim()) {
        return "Please ask a specific question about your health or well-being.";
      }

      // Check for minimum length and basic question structure
      if (userMessage.length < 3 || !/[a-zA-Z\s]/.test(userMessage)) {
        return "I can only assist with clear, well-formed questions about health and wellness. Please rephrase your question.";
      }

      // Construct the message with health data if available
      let fullMessage = userMessage;
      if (healthData) {
        fullMessage += "\n\nHealth Data:";
        if (healthData.steps !== undefined) {
          fullMessage += `\n- Steps today: ${healthData.steps}`;
        }
        if (healthData.heartRate !== undefined) {
          fullMessage += `\n- Current heart rate: ${healthData.heartRate} bpm`;
        }
        if (healthData.sleepHours !== undefined) {
          fullMessage += `\n- Sleep duration: ${healthData.sleepHours} hours`;
        }
        if (healthData.sleepEfficiency !== undefined) {
          fullMessage += `\n- Sleep efficiency: ${healthData.sleepEfficiency}%`;
        }
      }

      // Add time context
      const now = new Date();
      const timeContext = this.getTimeContext(now);
      fullMessage += `\n\n${timeContext}`;

      // Prepare messages array for the API call
      const messages = [
        ...this.messageHistory,
        { role: 'user' as const, content: fullMessage }
      ];

      // Make the API call
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages,
        temperature: 0.7,
        max_tokens: 1000,
        presence_penalty: 0.6,
        frequency_penalty: 0.6,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response received from OpenAI');
      }

      // Update message history
      this.messageHistory.push(
        { role: 'user', content: fullMessage },
        { role: 'assistant', content: response }
      );

      // Trim history if needed
      if (this.messageHistory.length > 10) {
        this.messageHistory = [
          this.messageHistory[0],
          ...this.messageHistory.slice(-6)
        ];
      }

      return response;

    } catch (error: any) {
      console.error('OpenAI API error:', error);

      // Handle specific API errors
      if (error.status === 401) {
        throw new Error('Invalid API key. Please check your OpenAI API key configuration.');
      } else if (error.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a few moments.');
      } else if (error.status === 500) {
        throw new Error('OpenAI service is temporarily unavailable.');
      }

      // Handle other errors
      throw new Error(
        error.message || 'Failed to get response from OpenAI'
      );
    }
  }

  private getTimeContext(date: Date): string {
    const hour = date.getHours();
    const season = this.getSeason(date);
    
    let timeOfDay;
    if (hour >= 6 && hour < 10) timeOfDay = "Kapha time (morning)";
    else if (hour >= 10 && hour < 14) timeOfDay = "Pitta time (midday)";
    else if (hour >= 14 && hour < 18) timeOfDay = "Vata time (afternoon)";
    else if (hour >= 18 && hour < 22) timeOfDay = "Kapha time (evening)";
    else if (hour >= 22 || hour < 2) timeOfDay = "Pitta time (night)";
    else timeOfDay = "Vata time (early morning)";

    return `Current context:\n- Time: ${timeOfDay}\n- Season: ${season}`;
  }

  private getSeason(date: Date): string {
    const month = date.getMonth();
    if (month >= 2 && month <= 4) return "Spring (Vasanta)";
    if (month >= 5 && month <= 7) return "Summer (Grishma)";
    if (month >= 8 && month <= 10) return "Autumn (Sharad)";
    return "Winter (Hemanta)";
  }
}

export default OpenAIService; 
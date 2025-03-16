import OpenAI from 'openai';

class OpenAIService {
  private static instance: OpenAIService;
  private openai: OpenAI;

  private constructor() {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured. Please check your environment variables.');
      throw new Error('OpenAI API key is required');
    }
    this.openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Note: In production, you should proxy requests through your backend
    });
  }

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  private getSystemPrompt(): string {
    return `You are an expert Ayurvedic practitioner with deep knowledge of traditional Indian medicine and modern health practices. Your responses should:

1. ASSESSMENT:
- Analyze symptoms and health data through the lens of Ayurvedic doshas (Vata, Pitta, Kapha)
- Consider the whole person: physical, mental, and emotional aspects
- Identify potential imbalances in the doshas based on provided information

2. RECOMMENDATIONS:
- Provide specific, actionable advice based on Ayurvedic principles
- Include both immediate relief measures and long-term lifestyle changes
- Suggest appropriate dietary modifications based on dosha balance
- Recommend specific yoga poses or breathing exercises when relevant
- Mention traditional Ayurvedic herbs or remedies when appropriate

3. INTEGRATION:
- When health data is provided (steps, heart rate, sleep), interpret it through both modern and Ayurvedic perspectives
- Explain how the recommendations align with both traditional wisdom and contemporary health science
- Suggest ways to incorporate Ayurvedic practices into modern lifestyle

4. COMMUNICATION STYLE:
- Maintain a compassionate and professional tone
- Use clear, accessible language while accurately incorporating Ayurvedic terminology
- Provide explanations for Ayurvedic concepts in modern terms
- Be specific and practical in your advice

5. SAFETY:
- Include relevant health warnings or precautions
- Recommend consulting with healthcare providers for serious conditions
- Acknowledge the complementary nature of Ayurvedic and modern medicine

Remember to tailor your response to the individual's specific situation and any health data provided.`;
  }

  public async getAyurvedaAdvice(
    userMessage: string,
    healthData?: {
      steps?: number;
      heartRate?: number;
      sleepHours?: number;
    }
  ): Promise<string> {
    try {
      let userPromptWithData = userMessage;
      
      if (healthData) {
        userPromptWithData += "\n\nCurrent Health Metrics:";
        if (healthData.steps) {
          const activityLevel = this.analyzeActivityLevel(healthData.steps);
          userPromptWithData += `\n- Daily steps: ${healthData.steps} (${activityLevel})`;
        }
        if (healthData.heartRate) {
          const hrCategory = this.categorizeHeartRate(healthData.heartRate);
          userPromptWithData += `\n- Average heart rate: ${healthData.heartRate} bpm (${hrCategory})`;
        }
        if (healthData.sleepHours) {
          const sleepQuality = this.analyzeSleepDuration(healthData.sleepHours);
          userPromptWithData += `\n- Sleep duration: ${healthData.sleepHours} hours (${sleepQuality})`;
        }
      }

      console.log('Sending request to OpenAI...');
      const response = await this.openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          { role: "system", content: this.getSystemPrompt() },
          { role: "user", content: userPromptWithData }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        presence_penalty: 0.3,
        frequency_penalty: 0.3
      });

      const advice = response.choices[0]?.message?.content;
      if (!advice) {
        throw new Error('No response received from OpenAI');
      }

      return advice;
    } catch (error: any) {
      console.error('Error getting Ayurveda advice:', error);
      if (error.response?.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your configuration.');
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a few moments.');
      } else if (error.response?.status === 500) {
        throw new Error('OpenAI service is currently experiencing issues. Please try again later.');
      }
      throw new Error('Failed to get Ayurvedic advice. Please try again later.');
    }
  }

  private analyzeActivityLevel(steps: number): string {
    if (steps < 4000) return "Sedentary - needs improvement";
    if (steps < 8000) return "Moderately active";
    if (steps < 12000) return "Active";
    return "Very active";
  }

  private categorizeHeartRate(bpm: number): string {
    if (bpm < 60) return "Below normal range";
    if (bpm <= 100) return "Normal range";
    return "Above normal range";
  }

  private analyzeSleepDuration(hours: number): string {
    if (hours < 6) return "Insufficient";
    if (hours <= 7) return "Borderline";
    if (hours <= 9) return "Optimal";
    return "Extended";
  }
}

export default OpenAIService; 
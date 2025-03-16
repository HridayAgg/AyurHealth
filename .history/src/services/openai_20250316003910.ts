import OpenAI from 'openai';

class OpenAIService {
  private static instance: OpenAIService;
  private openai: OpenAI;

  private constructor() {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured. Please check your environment variables.');
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

  public async getAyurvedaAdvice(
    userMessage: string,
    healthData?: {
      steps?: number;
      heartRate?: number;
      sleepHours?: number;
    }
  ): Promise<string> {
    try {
      let systemPrompt = `You are an expert Ayurvedic practitioner with deep knowledge of traditional Indian medicine. 
      Your role is to provide personalized health advice based on Ayurvedic principles, considering the user's symptoms, 
      lifestyle, and health data. Always maintain a compassionate and professional tone. Focus on holistic wellness 
      while providing practical, actionable advice. Include references to traditional Ayurvedic concepts when relevant.`;

      let userPromptWithData = userMessage;
      if (healthData) {
        userPromptWithData += "\n\nHealth Data:";
        if (healthData.steps) userPromptWithData += `\n- Daily steps: ${healthData.steps}`;
        if (healthData.heartRate) userPromptWithData += `\n- Average heart rate: ${healthData.heartRate} bpm`;
        if (healthData.sleepHours) userPromptWithData += `\n- Sleep duration: ${healthData.sleepHours} hours`;
      }

      const response = await this.openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPromptWithData }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return response.choices[0]?.message?.content || "I apologize, but I couldn't generate advice at the moment.";
    } catch (error) {
      console.error('Error getting Ayurveda advice:', error);
      throw new Error('Failed to get Ayurvedic advice. Please try again later.');
    }
  }
}

export default OpenAIService; 
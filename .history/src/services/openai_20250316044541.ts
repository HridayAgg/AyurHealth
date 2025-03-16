import OpenAI from 'openai';

class OpenAIService {
  private static instance: OpenAIService;
  private openai: OpenAI;

  private constructor() {
    this.openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  public async getAyurvedicResponse(messages: { role: 'user' | 'assistant' | 'system'; content: string }[]) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an expert Ayurvedic practitioner and wellness consultant with deep knowledge of traditional Ayurvedic principles, practices, and remedies. 
            Your responses should:
            - Be grounded in authentic Ayurvedic wisdom
            - Provide practical, actionable advice
            - Include relevant Sanskrit terms with explanations
            - Consider holistic wellness (physical, mental, and spiritual)
            - Be clear and accessible to modern audiences
            - Include relevant disclaimers when discussing health matters
            - Cite traditional texts or principles when appropriate
            
            Remember to maintain a compassionate and professional tone while making Ayurvedic concepts relatable to contemporary life.`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }
}

export default OpenAIService; 
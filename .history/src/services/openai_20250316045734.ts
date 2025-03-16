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

Example format for a typical response:
## Recommendation
[Brief main advice]

## Key Points
- Point 1
- Point 2

*Sanskrit term* (meaning) - only when relevant

Remember: Prioritize brevity while maintaining clarity and authenticity.`
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
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

    if (!apiKey) {
      console.error('OpenAI API key is not configured');
      throw new Error('OpenAI API key is required');
    }

    console.log('Initializing OpenAI service...');
    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });

    // Initialize message history with system prompt
    this.messageHistory = [{ role: 'system', content: this.getSystemPrompt() }];
    console.log('Message history initialized with system prompt');
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
- When health metrics are provided, analyze them in the context of dosha balance

2. RECOMMENDATIONS:
- Provide specific, actionable advice based on Ayurvedic principles
- Include both immediate relief measures and long-term lifestyle changes
- Suggest appropriate dietary modifications based on dosha balance
- Recommend specific yoga poses or breathing exercises when relevant
- Mention traditional Ayurvedic herbs or remedies when appropriate
- Tailor advice based on the time of day and season when possible

3. INTEGRATION:
- When health data is provided (steps, heart rate, sleep), interpret it through both modern and Ayurvedic perspectives
- Explain how the recommendations align with both traditional wisdom and contemporary health science
- Suggest ways to incorporate Ayurvedic practices into modern lifestyle
- Consider the user's daily routine (dinacharya) in recommendations

4. COMMUNICATION STYLE:
- Maintain a compassionate and professional tone
- Use clear, accessible language while accurately incorporating Ayurvedic terminology
- Provide explanations for Ayurvedic concepts in modern terms
- Be specific and practical in your advice
- Format responses with clear sections and bullet points for readability

5. SAFETY:
- Include relevant health warnings or precautions
- Recommend consulting with healthcare providers for serious conditions
- Acknowledge the complementary nature of Ayurvedic and modern medicine
- Emphasize the importance of gradual, sustainable changes

Remember to:
- Tailor your response to the individual's specific situation and health data
- Consider seasonal influences (ritucharya) in your recommendations
- Suggest lifestyle modifications that are practical and achievable
- Provide context for why each recommendation is beneficial`;
  }

  public async getAyurvedaAdvice(
    userMessage: string,
    healthData?: HealthData
  ): Promise<string> {
    try {
      let userPromptWithData = userMessage;
      
      if (healthData) {
        userPromptWithData += "\n\nCurrent Health Metrics:";
        if (healthData.steps !== undefined) {
          const activityLevel = this.analyzeActivityLevel(healthData.steps);
          userPromptWithData += `\n- Daily steps: ${healthData.steps} (${activityLevel})`;
        }
        if (healthData.heartRate !== undefined) {
          const hrCategory = this.categorizeHeartRate(healthData.heartRate);
          userPromptWithData += `\n- Average heart rate: ${healthData.heartRate} bpm (${hrCategory})`;
        }
        if (healthData.sleepHours !== undefined) {
          const sleepQuality = this.analyzeSleepDuration(healthData.sleepHours);
          userPromptWithData += `\n- Sleep duration: ${healthData.sleepHours} hours (${sleepQuality})`;
        }
        if (healthData.sleepEfficiency !== undefined) {
          const efficiencyCategory = this.analyzeSleepEfficiency(healthData.sleepEfficiency);
          userPromptWithData += `\n- Sleep efficiency: ${healthData.sleepEfficiency}% (${efficiencyCategory})`;
        }
      }

      // Add current time and season context
      const now = new Date();
      const season = this.getCurrentSeason(now);
      const timeOfDay = this.getTimeOfDay(now);
      userPromptWithData += `\n\nContext:\n- Time of day: ${timeOfDay}\n- Season: ${season}`;

      // Add user message to history
      this.messageHistory.push({ role: 'user', content: userPromptWithData });

      console.log('Sending request to OpenAI...');

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: this.messageHistory,
        temperature: 0.7,
        max_tokens: 1000,
        presence_penalty: 0.6,
        frequency_penalty: 0.6,
      });

      const advice = response.choices[0]?.message?.content;
      if (!advice) {
        throw new Error('No response received from OpenAI');
      }

      // Add assistant's response to history
      this.messageHistory.push({ role: 'assistant', content: advice });

      // Keep history at a reasonable size
      if (this.messageHistory.length > 10) {
        this.messageHistory = [
          this.messageHistory[0], // Keep system prompt
          ...this.messageHistory.slice(-6) // Keep last 6 messages for context
        ];
      }

      return this.formatResponse(advice);

    } catch (error: any) {
      console.error('OpenAI API error:', error);
      
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a few moments.');
      } else if (error.response?.status === 500) {
        throw new Error('OpenAI service is temporarily unavailable. Please try again later.');
      }
      
      throw new Error(error.message || 'Failed to get Ayurvedic advice');
    }
  }

  private formatResponse(response: string): string {
    // Add markdown formatting for better readability
    return response
      .replace(/^([A-Z][A-Za-z\s]+:)/gm, '**$1**') // Bold section headers
      .replace(/^[-•]\s/gm, '• ') // Standardize bullet points
      .trim();
  }

  private analyzeActivityLevel(steps: number): string {
    if (steps < 4000) return "Sedentary - indicates potential Kapha imbalance";
    if (steps < 8000) return "Moderately active - balanced activity";
    if (steps < 12000) return "Active - supports Vata-Pitta balance";
    return "Very active - watch for Vata elevation";
  }

  private categorizeHeartRate(bpm: number): string {
    if (bpm < 60) return "Below normal - possible Kapha dominance";
    if (bpm <= 100) return "Normal range - balanced";
    return "Above normal - possible Pitta elevation";
  }

  private analyzeSleepDuration(hours: number): string {
    if (hours < 6) return "Insufficient - may increase Vata";
    if (hours <= 7) return "Borderline - monitor energy levels";
    if (hours <= 9) return "Optimal - supports dosha balance";
    return "Extended - may increase Kapha";
  }

  private analyzeSleepEfficiency(efficiency: number): string {
    if (efficiency < 75) return "Poor - may indicate Vata imbalance";
    if (efficiency < 85) return "Fair - room for improvement";
    return "Good - supports overall balance";
  }

  private getCurrentSeason(date: Date): string {
    const month = date.getMonth();
    // Simplified seasonal classification
    if (month >= 2 && month <= 4) return "Spring (Vasanta)";
    if (month >= 5 && month <= 7) return "Summer (Grishma)";
    if (month >= 8 && month <= 10) return "Autumn (Sharad)";
    return "Winter (Hemanta)";
  }

  private getTimeOfDay(date: Date): string {
    const hour = date.getHours();
    // Ayurvedic time periods
    if (hour >= 6 && hour < 10) return "Kapha time (6-10 AM)";
    if (hour >= 10 && hour < 14) return "Pitta time (10 AM-2 PM)";
    if (hour >= 14 && hour < 18) return "Vata time (2-6 PM)";
    if (hour >= 18 && hour < 22) return "Kapha time (6-10 PM)";
    if (hour >= 22 || hour < 2) return "Pitta time (10 PM-2 AM)";
    return "Vata time (2-6 AM)";
  }
}

export default OpenAIService; 
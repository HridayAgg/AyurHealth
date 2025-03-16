interface HealthData {
  steps?: number;
  heartRate?: number;
  sleepHours?: number;
  sleepEfficiency?: number;
}

class OpenAIService {
  private static instance: OpenAIService;
  private messageHistory: { role: 'system' | 'user' | 'assistant'; content: string }[] = [];

  private constructor() {
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
    return `You are an expert Ayurvedic practitioner with deep knowledge of traditional Indian medicine and modern health practices.`;
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

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock responses based on keywords in the user's message
      const responses = [
        {
          keywords: ['sleep', 'insomnia', 'rest', 'tired'],
          response: "According to Ayurvedic principles, your sleep issues may be related to a Vata imbalance. I recommend:\n\n1. Establish a regular sleep schedule\n2. Practice gentle yoga before bed\n3. Try warm milk with nutmeg and cardamom\n4. Massage your feet with warm sesame oil\n5. Avoid screens 1 hour before bedtime"
        },
        {
          keywords: ['stress', 'anxiety', 'worry', 'tension'],
          response: "From an Ayurvedic perspective, stress often indicates elevated Vata and Pitta. Here's what you can do:\n\n1. Practice deep breathing exercises (pranayama)\n2. Take regular breaks for meditation\n3. Use calming herbs like Ashwagandha\n4. Follow a regular daily routine\n5. Incorporate cooling foods in your diet"
        },
        {
          keywords: ['digestion', 'stomach', 'appetite', 'gut'],
          response: "Ayurveda considers digestion (Agni) as crucial for overall health. Based on your symptoms:\n\n1. Eat your main meal at lunch when digestion is strongest\n2. Avoid cold drinks with meals\n3. Use digestive spices like cumin, coriander, and fennel\n4. Take a short walk after meals\n5. Practice mindful eating"
        },
        {
          keywords: ['energy', 'fatigue', 'tired', 'exhaustion'],
          response: "In Ayurveda, low energy often relates to an imbalance in all three doshas. Here's a holistic approach:\n\n1. Start your day with warm lemon water\n2. Practice morning sun salutations\n3. Include adaptogenic herbs like Ashwagandha\n4. Maintain regular meal times\n5. Get adequate rest between activities"
        },
        {
          keywords: ['skin', 'acne', 'rash', 'complexion'],
          response: "Skin issues in Ayurveda often indicate a Pitta imbalance. Consider these recommendations:\n\n1. Include cooling foods like cucumber and mint\n2. Use natural face masks with neem and turmeric\n3. Stay hydrated with coconut water\n4. Practice stress management\n5. Avoid excessive sun exposure"
        }
      ];

      // Add health data context if available
      let healthContext = '';
      if (healthData) {
        if (healthData.steps !== undefined) {
          healthContext += `\n\nBased on your activity level (${healthData.steps} steps today), `;
          if (healthData.steps < 5000) {
            healthContext += "I recommend increasing your physical activity gradually.";
          } else if (healthData.steps > 10000) {
            healthContext += "you're maintaining good physical activity. Keep it up!";
          } else {
            healthContext += "you're on the right track with your activity level.";
          }
        }
        if (healthData.heartRate !== undefined) {
          healthContext += `\n\nYour current heart rate (${healthData.heartRate} bpm) indicates `;
          if (healthData.heartRate > 90) {
            healthContext += "you might benefit from some calming practices.";
          } else if (healthData.heartRate < 60) {
            healthContext += "you're in a relaxed state.";
          } else {
            healthContext += "a balanced state.";
          }
        }
      }

      // Find matching response or use default
      const matchingResponse = responses.find(r => 
        r.keywords.some(keyword => userMessage.toLowerCase().includes(keyword))
      );

      const response = matchingResponse 
        ? matchingResponse.response + healthContext
        : "Based on Ayurvedic principles, I recommend focusing on establishing a balanced daily routine (dinacharya) that aligns with your natural constitution. This includes:\n\n1. Wake up early with the sun\n2. Practice morning meditation\n3. Eat meals at regular times\n4. Exercise moderately\n5. Get adequate rest" + healthContext;

      // Update message history
      this.messageHistory.push(
        { role: 'user', content: userMessage },
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

    } catch (error) {
      console.error('Error in mock OpenAI service:', error);
      throw new Error('Failed to generate response. Please try again.');
    }
  }
}

export default OpenAIService; 
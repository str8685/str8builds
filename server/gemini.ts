import { GoogleGenerativeAI } from '@google/generative-ai';

// Check for API key with better error handling
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY not found in environment variables');
  console.warn('AI features will not function properly without a valid API key');
}

// Initialize the Gemini API client with error handling
let genAI: GoogleGenerativeAI;
let model: any;

try {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  // Use gemini-pro with proper API version
  model = genAI.getGenerativeModel({ 
    model: 'gemini-pro',
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 2048,
    }
  });
} catch (error) {
  console.error('Failed to initialize Gemini API client:', error);
  // Create a placeholder that returns fallback values
  // This prevents the entire app from crashing if the API is unavailable
  genAI = {} as GoogleGenerativeAI;
  model = {
    generateContent: async () => {
      throw new Error('AI model not available. Please check your API key.');
    }
  };
}

/**
 * Generate a response to a general prompt
 */
export async function generateResponse(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response');
  }
}

/**
 * Generate construction-specific recommendations based on context
 */
export async function generateConstructionRecommendation(context: string): Promise<string> {
  try {
    const prompt = `
      As an expert New Zealand construction advisor, provide professional advice for the following situation:
      
      ${context}
      
      Focus specifically on:
      1. New Zealand Building Code compliance
      2. Best practices for the NZ climate and conditions
      3. Material recommendations suitable for the New Zealand market
      4. Safety considerations
      5. Cost-effectiveness and durability
      
      Format your response in easy-to-read paragraphs with a clear recommendation.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating construction recommendation:', error);
    throw new Error('Failed to generate construction recommendation');
  }
}

/**
 * Process voice commands and determine intent and actions
 */
export async function processVoiceCommand(command: string): Promise<{
  intent: string;
  action: string;
  parameters: Record<string, any>;
}> {
  try {
    const prompt = `
      You are an AI assistant for a construction app called STR8 BUILD. 
      Parse the following voice command and determine the user's intent.
      
      Voice command: "${command}"
      
      Return a JSON object with the following structure:
      {
        "intent": "[navigation|timer|calculation|project|weather|unknown]",
        "action": "[specific action like navigate, start, stop, create, etc.]",
        "parameters": {
          // Any relevant parameters extracted from the command
          // Examples: destination for navigation, project name for timers, etc.
        }
      }
      
      Examples:
      - "Go to dashboard" → {"intent": "navigation", "action": "navigate", "parameters": {"destination": "dashboard"}}
      - "Start timer for Smith project" → {"intent": "timer", "action": "start", "parameters": {"project": "Smith"}}
      - "Check weather" → {"intent": "weather", "action": "check", "parameters": {}}
      
      Only return the JSON object, nothing else.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    try {
      return JSON.parse(response.text());
    } catch (jsonError) {
      // If JSON parsing fails, return a default error response
      console.error('Error parsing JSON response:', jsonError);
      return {
        intent: 'unknown',
        action: 'unknown',
        parameters: {
          error: 'Failed to parse command'
        }
      };
    }
  } catch (error) {
    console.error('Error processing voice command:', error);
    throw new Error('Failed to process voice command');
  }
}

/**
 * Generate material recommendations based on project type, budget, and location
 */
export async function generateMaterialRecommendations(
  projectType: string,
  budget: string,
  location: string
): Promise<string> {
  try {
    const prompt = `
      As a New Zealand construction materials expert, recommend the best materials for:
      
      Project Type: ${projectType}
      Budget Range: ${budget}
      Location in NZ: ${location}
      
      Please provide specific recommendations for:
      1. Primary structural materials (timber, steel, concrete, etc.)
      2. Insulation and weatherproofing appropriate for the location
      3. Finishing materials (cladding, flooring, etc.)
      4. Any specific NZ brands or suppliers that would be ideal
      5. Sustainability considerations
      
      Format your response as a bullet-point list for each category.
      Include specific details about why each material is appropriate for this region and project type.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating material recommendations:', error);
    throw new Error('Failed to generate material recommendations');
  }
}

/**
 * Generate weather impact analysis for construction projects
 */
export async function generateWeatherImpactAnalysis(
  projectType: string,
  location: string,
  weatherCondition: string,
  startDate: string,
  duration: number
): Promise<string> {
  try {
    const prompt = `
      As a construction weather impact specialist in New Zealand, analyze how the following 
      weather conditions will affect this construction project:
      
      Project Type: ${projectType}
      Location in NZ: ${location}
      Weather Condition: ${weatherCondition}
      Project Start Date: ${startDate}
      Project Duration: ${duration} days
      
      Please provide a detailed analysis that includes:
      
      1. Potential delays: Estimate the number of days that might be lost due to weather
      2. Safety risks: Specific safety concerns raised by these weather conditions
      3. Material impacts: How materials might be affected (curing, drying times, etc.)
      4. Equipment considerations: Special equipment needs or limitations
      5. Mitigation strategies: Recommended actions to minimize weather impacts
      6. Alternative scheduling: Suggestions for optimal timing if applicable
      
      Format your response as a professional analysis with clear sections and practical recommendations.
      Include specific details relevant to New Zealand building practices and regulations.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating weather impact analysis:', error);
    throw new Error('Failed to generate weather impact analysis');
  }
}
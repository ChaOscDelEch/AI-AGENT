// Configuration settings for the application
import { z } from 'zod';

// Schema for environment variables
const EnvironmentSchema = z.object({
  // Server configuration
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // OpenAI configuration
  OPENAI_API_KEY: z.string().min(1, "OpenAI API key is required"),
  
  // Local model configuration (for development)
  LOCAL_MODEL_URL: z.string().url().optional(),
});

// Function to validate environment variables
export function validateEnv() {
  try {
    const env = EnvironmentSchema.parse(process.env);
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:', error.errors);
      throw new Error('Invalid environment variables');
    }
    throw error;
  }
}

// Export a validated environment object
export const env = validateEnv();

// Helper function to check if we're in development mode
export const isDevelopment = env.NODE_ENV === 'development';

// Helper function to determine which model to use based on environment
export function getModelEndpoint() {
  if (isDevelopment && env.LOCAL_MODEL_URL) {
    console.log('🤖 Using local model for development');
    return env.LOCAL_MODEL_URL;
  }
  
  console.log('🤖 Using OpenAI model for production');
  return 'https://api.openai.com/v1';
}

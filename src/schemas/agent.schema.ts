import { z } from 'zod';

// Schema for validating the prompt in the request body
export const AgentRequestSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty")
});

// Type definition derived from the schema
export type AgentRequest = z.infer<typeof AgentRequestSchema>;

// Schema for the response from our agent
export const AgentResponseSchema = z.object({
  response: z.string(),
  metadata: z.object({
    processedBy: z.array(z.string()),
    executionTime: z.number()
  }).optional()
});

// Type definition for the response
export type AgentResponse = z.infer<typeof AgentResponseSchema>;

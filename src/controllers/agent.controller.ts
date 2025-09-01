import type { Request, Response } from 'express';
import { AgentRequestSchema, AgentResponseSchema } from '../schemas/agent.schema.js';
import { inputGuardrail } from '../tools/guardrails.js';
import { OrchestratorAgent } from '../agents/orchestrator.js';

// Initialize the orchestrator agent
const orchestrator = new OrchestratorAgent();

export async function agentController(req: Request, res: Response) {
  try {
    // 1. Validate the request body
    const validationResult = AgentRequestSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Invalid request', 
        details: validationResult.error.errors 
      });
    }
    
    const { prompt } = validationResult.data;
    
    // 2. Apply input guardrails for safety
    const guardrailResult = inputGuardrail(prompt);
    
    if (!guardrailResult.safe) {
      return res.status(400).json({ 
        error: 'Unsafe content detected', 
        message: guardrailResult.message 
      });
    }
    
    // 3. If input was sanitized, log it
    if (guardrailResult.message) {
      console.log(`Input sanitized: ${guardrailResult.message}`);
    }
    
    // 4. Start timing for performance tracking
    const startTime = Date.now();
    
    // 5. Process the prompt with the orchestrator agent
    const agentResponse = await orchestrator.process(guardrailResult.content);
    
    // 6. Calculate execution time
    const executionTime = Date.now() - startTime;
    
    // 7. Prepare and validate the response
    const response = {
      response: agentResponse,
      metadata: {
        processedBy: ['Orchestrator', 'Researcher', 'Summarizer', 'FactChecker'],
        executionTime
      }
    };
    
    const validatedResponse = AgentResponseSchema.parse(response);
    
    // 8. Send the response
    return res.status(200).json(validatedResponse);
    
  } catch (error) {
    console.error('Error in agent controller:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'An unexpected error occurred while processing your request'
    });
  }
}

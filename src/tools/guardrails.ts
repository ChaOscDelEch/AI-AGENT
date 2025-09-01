// A simple guardrail to check for potentially unsafe content

// List of potentially problematic terms or patterns to filter out
const UNSAFE_PATTERNS = [
  /hack\s+into/i,
  /illegal/i,
  /exploit/i,
  /harmful/i,
  // Add more patterns as needed
];

// Function to check if content might be unsafe
export function isUnsafeContent(input: string): boolean {
  return UNSAFE_PATTERNS.some(pattern => pattern.test(input));
}

// Function to sanitize input by removing problematic terms
export function sanitizeInput(input: string): string {
  let sanitized = input;
  
  // Replace potentially problematic terms with [FILTERED]
  UNSAFE_PATTERNS.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '[FILTERED]');
  });
  
  return sanitized;
}

// Main guardrail function that either rejects or sanitizes input
export function inputGuardrail(input: string, strictMode = false): { 
  safe: boolean;
  content: string;
  message?: string;
} {
  if (isUnsafeContent(input)) {
    if (strictMode) {
      // Reject the input completely in strict mode
      return {
        safe: false,
        content: '',
        message: 'Input contains potentially unsafe content and was rejected.'
      };
    } else {
      // Sanitize the input in regular mode
      return {
        safe: true,
        content: sanitizeInput(input),
        message: 'Input was sanitized to remove potentially unsafe content.'
      };
    }
  }
  
  // Input is safe
  return {
    safe: true,
    content: input
  };
}

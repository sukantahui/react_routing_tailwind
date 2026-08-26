const topic17_questions = [
  {
    "question": "How does the Chain of Responsibility pattern decouple senders and receivers?",
    "shortAnswer": "The client sends a request to the start of the chain without needing to know which specific handler in the pipeline will satisfy the request or how many intermediate filters will inspect it.",
    "explanation": "Promotes Open-Closed principle; new handlers can be added anywhere in the chain.",
    "hint": "Client sends to chain head without knowing specific handling nodes.",
    "level": "Beginner",
    "codeExample": "chainHead.handle(request);"
  },
  {
    "question": "What happens if no handler in the chain can process a request?",
    "shortAnswer": "The request either drops off the end of the chain silently or is handled by a default fallback handler at the tail of the pipeline.",
    "explanation": "Ensures graceful degradation or explicit default routing.",
    "hint": "Falls off the end of the chain or executes a default tail handler.",
    "level": "Intermediate",
    "codeExample": "if (next == null) return defaultFallback();"
  }
];

export default topic17_questions;

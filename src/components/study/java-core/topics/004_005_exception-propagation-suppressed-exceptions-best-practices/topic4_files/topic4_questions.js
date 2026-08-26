const topic4_questions = [
  {
    "question": "What is 'Exception Chaining' (or Exception Wrapping) and why is it an essential architecture practice (Effective Java Item 73)?",
    "shortAnswer": "Exception Chaining is the practice of catching a low-level implementation exception (like SQLException or IOException) and throwing a higher-level domain exception (like OrderPersistenceException) that wraps the original error as its 'cause'. It prevents implementation details from leaking into high-level APIs while preserving the complete root cause for debugging.",
    "explanation": "Effective Java Item 73: Throw exceptions appropriate to the abstraction.",
    "hint": "Translates low-level errors into high-level domain exceptions while keeping the root cause.",
    "level": "Intermediate",
    "codeExample": "throw new DomainException(\"Business failure\", lowLevelEx);"
  }
];

export default topic4_questions;
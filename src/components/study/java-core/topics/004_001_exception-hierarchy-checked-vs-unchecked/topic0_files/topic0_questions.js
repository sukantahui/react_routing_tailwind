const topic0_questions = [
  {
    "question": "Why is structured exception handling in Java vastly superior to C-style return code error checking?",
    "shortAnswer": "1. Separates regular business logic from error-handling paths. 2. Exceptions cannot be silently ignored by callers (they halt execution or propagate if unhandled). 3. Eliminates return-value ambiguities (e.g. distinguishing a real result of -1 from an error code of -1). 4. Carries full stack traces and contextual error messages.",
    "explanation": "Standard foundation of all modern object-oriented software engineering.",
    "hint": "Separates business logic, prevents silent error ignoring, and provides stack traces.",
    "level": "Beginner",
    "codeExample": "if (amount > balance) throw new InsufficientFundsException(\"Cannot withdraw\");"
  }
];

export default topic0_questions;
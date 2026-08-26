const topic9_questions = [
  {
    "question": "What is the difference between 'IllegalArgumentException' and 'IllegalStateException' in standard Java APIs?",
    "shortAnswer": "'IllegalArgumentException' indicates that a method was passed an invalid or inappropriate argument (e.g. negative radius). 'IllegalStateException' indicates that the method invocation was invalid because the target object is currently in an inappropriate lifecycle state (e.g. attempting to read from an already-closed stream).",
    "explanation": "Item 72 of Effective Java mandates reusing standard Java exceptions.",
    "hint": "IllegalArgumentException is for bad parameters; IllegalStateException is for bad object state.",
    "level": "Intermediate",
    "codeExample": "if (isClosed) throw new IllegalStateException(\"Connection already closed\");"
  }
];

export default topic9_questions;
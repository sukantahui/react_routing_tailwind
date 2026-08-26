const topic6_questions = [
  {
    "question": "What value does a 'transient' field receive when an object is reconstructed during deserialization?",
    "shortAnswer": "When an object is deserialized, any field marked with the 'transient' modifier is skipped during stream reading and is initialized to its Java language default value: 'null' for Object references, '0' for numeric primitives (int, double, long, etc.), and 'false' for booleans.",
    "explanation": "The constructor is bypassed, so field initializers in the class definition do not execute.",
    "hint": "Transient fields receive Java default values: null for objects, 0 for numbers, false for booleans.",
    "level": "Beginner",
    "codeExample": "private transient String password; // Restored as null upon deserialization"
  }
];

export default topic6_questions;
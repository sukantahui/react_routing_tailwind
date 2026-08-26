const topic8_questions = [
  {
    "question": "What exact error message does the Java compiler output when an argument does not satisfy a type bound constraint?",
    "shortAnswer": "The Java compiler rejects the code with: 'error: type argument X is not within bounds of type-variable T / found: X, required: SuperType'. This is caught 100% at compile-time during semantic analysis, preventing defective bytecode from ever being generated.",
    "explanation": "Core principle of Java type safety.",
    "hint": "Outputs 'type argument X is not within bounds of type-variable T' at compile time.",
    "level": "Beginner",
    "codeExample": "BoundedHolder<String> b = new BoundedHolder<>(); // Compiler error: String not within Number bound"
  }
];

export default topic8_questions;
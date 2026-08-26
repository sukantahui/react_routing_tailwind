const topic3_questions = [
  {
    "question": "What value is assigned to a static field 'public static int count = 50;' during the Preparation step of Linking?",
    "shortAnswer": "The field is assigned the default primitive value 0. The value 50 is assigned later during Phase 3 (Initialization).",
    "explanation": "Preparation sets default zeroes/nulls; Initialization executes explicit assignments.",
    "hint": "Assigned default value 0; the explicit value 50 is assigned during Initialization.",
    "level": "Intermediate",
    "codeExample": "Preparation: count = 0; Initialization: count = 50;"
  },
  {
    "question": "What is the purpose of the Bytecode Verifier in the Verification step?",
    "shortAnswer": "To protect the host operating system and JVM from malicious or corrupted bytecode by ensuring that code does not violate type safety, overflow the operand stack, or perform illegal memory operations.",
    "explanation": "Guarantees Java's core sandbox security model.",
    "hint": "Ensures bytecode adheres to JVM safety and security constraints.",
    "level": "Beginner",
    "codeExample": "Verifies type safety, stack depths, and method access modifiers."
  }
];

export default topic3_questions;

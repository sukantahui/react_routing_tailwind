const topic1_questions = [
  {
    "question": "What are the 3 sub-steps of the Linking phase in the ClassLoader subsystem?",
    "shortAnswer": "1. Verification (ensuring bytecode adheres to JVM constraints), 2. Preparation (allocating memory for static fields and assigning default values like 0/null), and 3. Resolution (replacing symbolic references with direct memory addresses).",
    "explanation": "Standard JVM Linking specification.",
    "hint": "Verification, Preparation, Resolution.",
    "level": "Intermediate",
    "codeExample": "Linking = Verify -> Prepare -> Resolve"
  },
  {
    "question": "What triggers Phase 3 (Initialization) of a class?",
    "shortAnswer": "The first active use of the class, such as instantiating with 'new', accessing a static field (non-constant), calling a static method, or using Class.forName(name, true, loader).",
    "explanation": "Passive uses (like referencing static final compile-time constants) do not trigger initialization.",
    "hint": "First active use: instantiation, static method call, or non-constant static field access.",
    "level": "Intermediate",
    "codeExample": "MyClass.staticMethod(); // Triggers initialization"
  }
];

export default topic1_questions;

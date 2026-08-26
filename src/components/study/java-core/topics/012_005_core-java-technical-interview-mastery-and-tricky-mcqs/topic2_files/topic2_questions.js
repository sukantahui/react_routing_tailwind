const topic2_questions = [
  {
    "question": "Can static methods be overridden in Java?",
    "shortAnswer": "No. Static methods can only be hidden, not overridden. Because static methods are bound at compile time based on the reference type, dynamic method dispatch (runtime polymorphism) does not apply to them.",
    "explanation": "Static methods use invokestatic bytecode instruction bound at compile time.",
    "hint": "Static methods are hidden at compile time, not overridden polymorphically.",
    "level": "Beginner",
    "codeExample": "Parent p = new Child(); p.staticMethod(); // Calls Parent"
  },
  {
    "question": "What happens if a Child class attempts to declare an instance method with the same signature as a static method in the Parent class?",
    "shortAnswer": "A compile-time error occurs: 'This instance method cannot override the static method from Parent'.",
    "explanation": "Java compiler prohibits mixing static and instance signatures across inheritance.",
    "hint": "Compiler error: instance method cannot override static method.",
    "level": "Intermediate",
    "codeExample": "// Compile Error: Cannot override static method with instance method"
  }
];

export default topic2_questions;
